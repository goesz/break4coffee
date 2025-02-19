import { FastifyRequest, FastifyReply } from 'fastify';
import { ListOrdersService } from '../services/ListOrdersService';
import jwt from 'jsonwebtoken';

class ListOrdersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const authHeader = request.headers.authorization;

            if (!authHeader) {
                return reply.status(401).send({ msg: 'Token não fornecido' });
            }

            const token = authHeader.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_PASS ?? '') as { id: string };

            const customer_id = decoded.id;

            const orderService = new ListOrdersService();
            const pedido = await orderService.execute({ customer_id });

            return reply.send(pedido);
        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            return reply.status(401).send({ msg: 'Token inválido ou expirado' });
        }
    }
}

export { ListOrdersController };
