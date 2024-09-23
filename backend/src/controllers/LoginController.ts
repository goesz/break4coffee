import { FastifyRequest, FastifyReply } from 'fastify';
import { LoginService } from '../services/LoginService'

class LoginController {
    async handle(request: FastifyRequest, reply: FastifyReply){
    const { email, password } = request.body as {email: string, password: string};
    try {
        const Login = new LoginService();
        const userLogin = await Login.execute({ email, password });
        reply.status(201).send(userLogin);
        return;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'E-mail ou senha inválidos.') {
                reply.status(422).send({ msg: 'E-mail ou senha inválidos.' });
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

export { LoginController };