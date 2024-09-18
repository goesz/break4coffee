import prismaClient from "../prisma";

interface CreateCustomerProps {
    name: string;
    email: string;
    password: string;
}

class CreateCustomerService {
    async execute({ name, email, password }: CreateCustomerProps){

    if(!name || !email || !password){
        throw new Error("Preencha todos os campos")
    }
    const userExists = await prismaClient.customer.findFirst({ 
        where:{
            email: email 
        }})

        if (userExists) {
            throw new Error("E-mail já utilizado")
          }
    const customer = await prismaClient.customer.create({
        data:{
            name,
            email,
            password,
            status: true
        }
    })
    console.log("Rota chamada")

        return customer
    }
}

export { CreateCustomerService }