import prismaClient from "../prisma";

interface CreateOrderProps {
    id_produto: string,
    loja: string;
    descricao: string;
    valor: number;
    status: boolean;
    customer_id: string;
}

const filaDeRequisicoes: (() => Promise<void>)[] = [];

async function processarRequisicao() {
    if (filaDeRequisicoes.length > 0) {
        const requisicao = filaDeRequisicoes.shift();
        if (requisicao) {
            await requisicao();
            processarRequisicao();
        }
    }
}

async function adicionarRequisicaoNaFila(funcao: () => Promise<any>) {
    filaDeRequisicoes.push(funcao);
    if (filaDeRequisicoes.length === 1) {
        processarRequisicao(); 
    }
}


class CreateOrderService {
    async execute({ id_produto, loja, descricao, valor, customer_id }: CreateOrderProps) {
        const valorArredondado = parseFloat(valor.toFixed(2));
        console.log(valorArredondado);
        console.log(typeof(valorArredondado));

        if (!valor || !descricao) {
            throw new Error("Preencha todos os campos");
        }

        const customer = await prismaClient.customer.findUnique({
            where: {
                id: customer_id
            }
        });

        if (!customer) {
            throw new Error("Cliente não encontrado");
        }

        if (customer.saldo < valor) {
            throw new Error("Saldo insuficiente");
        }

        await prismaClient.customer.update({
            where: {
                id: customer_id
            },
            data: {
                saldo: customer.saldo - valorArredondado
            }
        });

        const pedido = await prismaClient.pedido.create({
            data: {
                customer_id,
                descricao,
                valor,
                loja,
                id_produto,
                status: true
            }
        });

        console.log("Rota de criar pedido chamada");
        return pedido;
    }
}

export { CreateOrderService }