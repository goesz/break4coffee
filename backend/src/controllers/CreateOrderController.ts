import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateOrderService } from '../services/CreateOrderService';

class CreateOrderController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { customer_id, descricao, valor, loja, status } = request.body as { 
            customer_id: string; 
            descricao: string; 
            valor: number; 
            loja: string; 
            status: boolean; 
        };

        const createOrderService = new CreateOrderService();

        const pedido = await createOrderService.execute({
            customer_id: customer_id,
            descricao,
            valor,
            loja,
            status,
        });

        reply.send(pedido);
    }
}

export { CreateOrderController };
