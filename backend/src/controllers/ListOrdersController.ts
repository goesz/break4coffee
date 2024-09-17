import { FastifyRequest, FastifyReply } from 'fastify';
import { ListOrdersService } from '../services/ListOrdersService'

class ListOrdersController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { customer_id } = request.query as { customer_id: string }
        
        const orderService = new ListOrdersService();
        const pedido = await orderService.execute({ customer_id })

        reply.send(pedido);
    }
}
export { ListOrdersController }