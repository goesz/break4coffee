import { FastifyRequest, FastifyReply } from 'fastify';
import { InventoryService } from '../services/InventoryService';

class InventoryController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { productId, status } = request.body as {
            productId: string;
            status: string;
        };

        const inventoryService = new InventoryService();

        try {
            const updatedProduct = await inventoryService.execute(productId, status);
            return reply.status(200).send(updatedProduct);
        } catch (error) {
            console.error(error);
            return reply.status(400).send({ msg: 'Erro ao processar a requisição' });
        }
    }
}

export { InventoryController };
