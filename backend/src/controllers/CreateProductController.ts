import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateProductService } from '../services/CreateProductService'

class CreateProductController {
    async handle(request: FastifyRequest, reply: FastifyReply){
    const { id, nome, descricao, valor, tipo } = request.body as { id:string, nome:string, descricao:string, valor:number, tipo: string };
    try {
        const productService = new CreateProductService();
        const product = await productService.execute({ id, nome, descricao, valor, tipo });
        reply.status(201).send(product);
        return;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'E-mail já utilizado') {
                reply.status(422).send({ msg: 'E-mail já utilizado' });
                return;
            }

            if (error.message === 'Preencha todos os campos') {
                reply.status(400).send({ msg: 'Preencha todos os campos' });
                return;
            }

            console.error('Erro ao processar a requisição:', error);
            reply.status(500).send({ msg: 'Erro ao processar a requisição' });
            return;
        }

        console.error('Erro desconhecido:', error);
        reply.status(500).send({ msg: 'Erro desconhecido' });
    }
}
}

export { CreateProductController };