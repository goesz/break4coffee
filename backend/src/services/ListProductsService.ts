import prismaClient from "../prisma";

class ListProductsService {
    async execute(){

        const products = await prismaClient.produto.findMany()

        return products;

    }
}

export { ListProductsService }