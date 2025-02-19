import prismaClient from "../prisma";

interface UserProfile {
    name: string;
    email: string;
    saldo: number;
    role: string;
}
class ShowUserService {
    async execute(userId: string): Promise<UserProfile | null> {
        const user = await prismaClient.customer.findUnique({
            where: { id: userId },
            select: {
                name: true,
                email: true,
                saldo: true,
                role: true,
            },
        });

        return user;
    }
}

export { ShowUserService };
