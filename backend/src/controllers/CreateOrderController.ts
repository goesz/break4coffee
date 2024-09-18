import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateOrderService } from '../services/CreateOrderService';

class CreateOrderController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { customer_id, descricao, valor, loja, status, id_produto } = request.body as { 
            customer_id: string; 
            descricao: string; 
            valor: number; 
            loja: string; 
            status: boolean; 
            id_produto: string;
        };

        const createOrderService = new CreateOrderService();

        const pedido = await createOrderService.execute({
            customer_id: customer_id,
            descricao,
            valor,
            loja,
            status,
            id_produto
        });

        reply.send(pedido);
    }
}

export { CreateOrderController };
