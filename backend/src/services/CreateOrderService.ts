import prismaClient from "../prisma";

interface CreateOrderProps {
    id_produto: string,
    loja: string;
    descricao: string;
    valor: number;
    status: boolean;
    customer_id: string;

}

//   customer_id     descricao      valor          loja         status 
class CreateOrderService {
    async execute({ id_produto, loja, descricao, valor, customer_id }: CreateOrderProps){

    if(!valor || !descricao){
        throw new Error("Preencha todos os campos")
    }
    const pedido = await prismaClient.pedido.create({
        data:{
            id_produto,
            valor,
            loja,
            descricao,
            customer_id,
            status: true
        }
    })
    console.log("Rota chamada")

        return pedido
    }
}

export { CreateOrderService }