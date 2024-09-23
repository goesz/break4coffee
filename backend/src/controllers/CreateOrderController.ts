import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateOrderService } from '../services/CreateOrderService';

class CreateOrderController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {  customer_id, descricao, valor, loja, status, id_produto } = request.body as { 
            customer_id: string; 
            descricao: string; 
            valor: number; 
            loja: string; 
            status: boolean; 
            id_produto: string;
        };

        const createOrderService = new CreateOrderService();

        try {
            const order = await createOrderService.execute({
                customer_id,
                descricao,
                valor,
                loja,
                status,
                id_produto
            });

            return reply.status(201).send(order);
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: 'Erro ao criar o pedido' });
        }
    }
}

export { CreateOrderController };
