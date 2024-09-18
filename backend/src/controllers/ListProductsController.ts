import { FastifyRequest, FastifyReply } from 'fastify';
import { ListProductsService } from '../services/ListProductsService';

class ListProductsController {
    async handle(request: FastifyRequest, reply: FastifyReply){

        const ListProductService = new ListProductsService();

        const products = await ListProductService.execute();

        reply.send(products)

    }
}
export { ListProductsController }