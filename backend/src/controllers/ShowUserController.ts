import { FastifyRequest, FastifyReply } from 'fastify';
import { ShowUserService } from '../services/ShowUserService';

interface UserProfile {
    name: string;
    email: string;
    saldo: number;
}

class ShowUserController {
    async handle(request: FastifyRequest, reply: FastifyReply): Promise<UserProfile | null> {
        const { customer_id } = request.query as { customer_id: string };

        const userProfileService = new ShowUserService();

        try {
            const user = await userProfileService.execute(customer_id);
            if (!user) {
                return reply.status(404).send({ error: 'Usuário não encontrado' });
            }
            return reply.status(200).send(user);
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: 'Erro ao carregar perfil do usuário' });
        }
    }
}

export { ShowUserController };