import prismaClient from "../prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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


    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
        throw new Error("E-mail ou senha inválidos.")
    }

    const token = jwt.sign({id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '8h'} )
    console.log("Rota de logar chamada")
    
    const {password: _, ...userLogin} = user 
    return {
            user: userLogin,
            token: token
    }
}
}

export { LoginService }