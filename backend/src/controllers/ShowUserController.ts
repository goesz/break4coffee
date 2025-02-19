import { FastifyRequest, FastifyReply } from 'fastify';
import { ShowUserService } from '../services/ShowUserService';
import  jwt  from 'jsonwebtoken';

interface UserProfile {
    name: string;
    email: string;
    saldo: number;
    role: string;
}

class ShowUserController {
    async handle(request: FastifyRequest, reply: FastifyReply): Promise<UserProfile | null> {
        
        const authHeader = request.headers.authorization;
        
         if (!authHeader) {
                        return reply.status(401).send({ msg: 'Token não fornecido' });
                    }
        
        const token = authHeader.split(' ')[1];
        
        const decoded = jwt.verify(token, process.env.JWT_PASS ?? '') as { id: string };
        const customer_id = decoded.id;

        const userProfileService = new ShowUserService();

        try {
            const user = await userProfileService.execute(customer_id);
            if (!user) {
                return reply.status(404).send({ error: 'Usuário não encontrado' });
            }
            if (user.role === 'admin') {
                return reply.status(200).send({ user,
                    isAdmin: true });
            }

            return reply.status(200).send({ user,
                isAdmin: false}
            );
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: 'Erro ao carregar perfil do usuário' });
        }
    }
}

export { ShowUserController };