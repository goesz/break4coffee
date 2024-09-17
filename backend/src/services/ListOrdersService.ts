import prismaClient from "../prisma";

interface PedidoProps{
    customer_id: string;
}

class ListOrdersService {
    async execute( {customer_id}: PedidoProps ){

        const pedidos = await prismaClient.pedido.findMany({
            where: {
                customer_id: customer_id
            }
        })

        return pedidos;

    }
}

export { ListOrdersService }