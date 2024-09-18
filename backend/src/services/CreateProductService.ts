import prismaClient from "../prisma";

interface CreateProductProps {
    nome: string;
    descricao: string;
    id: string;
    valor: number;
    tipo: string;
}

class CreateProductService {
    async execute({ id, nome, descricao, valor, tipo }: CreateProductProps){

    if(!nome || !valor || !id || !tipo){
        throw new Error("Preencha todos os campos")
    }
    const productIdExists = await prismaClient.produto.findFirst({ 
        where:{
            id: id 
        }})

        if (productIdExists) {
            throw new Error("E-mail já utilizado")
          }
    const produto = await prismaClient.produto.create({
        data:{
            id,
            nome,
            descricao,
            valor,
            tipo
        }
    })
    console.log("Rota de criar usuário chamada")

        return produto
    }
}

export { CreateProductService }