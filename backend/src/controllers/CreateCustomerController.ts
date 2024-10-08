import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateCustomerService } from '../services/CreateCustomerService'

class CreateCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply){
    const { name, email, password, role } = request.body as {name: string, email: string, password: string, role: string};
    try {
        const customerService = new CreateCustomerService();
        const customer = await customerService.execute({ name, email, password, role });
        reply.status(201).send(customer);
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

export { CreateCustomerController };