import { FastifyRequest, FastifyReply } from 'fastify';
import { InventoryService } from '../services/InventoryService';
import prismaClient from '../prisma';
import jwt from 'jsonwebtoken';

class InventoryController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply.status(401).send({ msg: 'Token não fornecido' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_PASS ?? '') as { id: string };

            const user = await prismaClient.customer.findUnique({
                where: { id: decoded.id },
                select: { role: true }
            });

            if (!user || user.role !== 'admin') {
                return reply.status(403).send({ msg: 'Acesso negado' });
            }

            const { productId, status } = request.body as { productId: string; status: string };
            const inventoryService = new InventoryService();
            const updatedProduct = await inventoryService.execute(productId, status);

            return reply.status(200).send(updatedProduct);
        } catch (error) {
            return reply.status(401).send({ msg: 'Token inválido ou expirado' });
        }
    }
}

export { InventoryController };
