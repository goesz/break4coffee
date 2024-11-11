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
            if (error.message === 'Email already in use') {
                reply.status(422).send({ msg: 'Esse endereço de e-mail já está em uso.' });
                return;
            }

            if (error.message === 'Please fill in all fields') {
                reply.status(400).send({ msg: 'Preencha todos os campos' });
                return;
            }
            if (error.message === 'The password must be at least 8 characters long'){
                reply.status(433).send({ msg: 'A senha precisa ter no mínimo 8 caracteres' });
                return
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