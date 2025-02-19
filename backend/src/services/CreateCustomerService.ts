import prismaClient from "../prisma";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";

interface CreateCustomerProps {
    name: string;
    email: string;
    password: string;
    role: string;
}

class CreateCustomerService {
    async execute({ name, email, password, role }: CreateCustomerProps){

    if(!name || !email || !password){
        throw new Error("Please fill in all fields")
    }
    if (password.length < 8){
        throw new Error("The password must be at least 8 characters long")
    }
    const userExists = await prismaClient.customer.findUnique({ 
        where:{
            email: email 
        }})

        if (userExists) {
            throw new Error("Email already in use")
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
    console.log("Create user route has been called")

    const token = jwt.sign({ id: customer.id }, process.env.JWT_PASS ?? '', { expiresIn: '2h' });

    const { password: _, ...userWithoutPassword } = customer;

    return {
        ...userWithoutPassword,
        token
    };
}
};

export { CreateCustomerService }