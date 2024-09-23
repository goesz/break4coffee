import prismaClient from "../prisma";
import bcrypt from 'bcrypt';

interface CreateCustomerProps {
    name: string;
    email: string;
    password: string;
    role: string;
}

class CreateCustomerService {
    async execute({ name, email, password, role }: CreateCustomerProps){

    if(!name || !email || !password ||password.length <= 6){
        throw new Error("Preencha todos os campos")
    }
    const userExists = await prismaClient.customer.findUnique({ 
        where:{
            email: email 
        }})

        if (userExists) {
            throw new Error("E-mail já utilizado")
          }
    const hashPassword = await bcrypt.hash(password, 10)
    const customer = await prismaClient.customer.create({
        data:{
            name,
            email,
            role,
            password: hashPassword,
            status: true
        }
    })
    console.log("Rota de criar usuário chamada")

        return customer
    }
}

export { CreateCustomerService }