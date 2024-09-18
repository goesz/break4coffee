import prismaClient from "../prisma";

interface CustomerProps {
    email: string;
    password: string;
}

class LoginService {
    async execute({  email, password }: CustomerProps){

    if(!email || !password){
        throw new Error("Preencha todos os campos")
    }
    const user = await prismaClient.customer.findFirst({ 
        where:{
            email: email 
        }})

        if (!user) {
            throw new Error("Usuário não encontrado")
          }
    const checkPassword = await prismaClient.customer.findFirst({
        where:{
            email: email,
            password: password
        }
    })
    if(!checkPassword){
        throw new Error("Senha incorreta")
    }


    console.log("Rota de logar chamada")

}
}

export { LoginService }