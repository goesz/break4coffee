import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateOrderService } from '../services/CreateOrderService';
import jwt from 'jsonwebtoken';

class CreateOrderController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return reply.status(401).send({ msg: 'Token não fornecido' });
        }

        const token = authHeader.split(' ')[1];

        let customer_id: string;
        try {
            const decoded = jwt.verify(token, process.env.JWT_PASS ?? '') as { id: string };
            customer_id = decoded.id;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return reply.status(401).send({ msg: 'Token expirado' });
            }
            if (error instanceof jwt.JsonWebTokenError) {
                return reply.status(401).send({ msg: 'Token inválido' });
            }
            return reply.status(500).send({ msg: 'Erro ao processar o token' });
        }

        const { descricao, valor, loja, status, id_produto } = request.body as { 
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
            return reply.status(500).send({ msg: 'Erro ao criar o pedido' });
        }
    }
}

export { CreateOrderController };
