import prismaClient from "../prisma";

interface DeleteCustomerProps{
    id: string;
}

class DeleteCustomerService{
    async execute({ id }: DeleteCustomerProps){
        if(!id){
            throw new Error("Solicitaçao invalida")
        }

        const findCostumer = await prismaClient.customer.findFirst({
            where:{
                id: id
            }
        })

        if(!findCostumer){
            throw new Error("Cliente não existe")
        }
        await prismaClient.customer.delete({
            where:{
                id: findCostumer.id
            }
        })

        return { message: "Deletado com sucesso!" }
    }
}

export { DeleteCustomerService }