import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomersController } from "./controllers/ListCustomersController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { CreateOrderController } from "./controllers/CreateOrderController";
import { ListOrdersController } from "./controllers/ListOrdersController";
import { LoginController } from "./controllers/LoginController";
import { ListProductsController } from "./controllers/ListProductsController";
import { CreateProductController } from "./controllers/CreateProductController";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })
    fastify.post("/auth/register", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new CreateCustomerController().handle(request, reply)
    })
    fastify.post("/auth/login", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new LoginController().handle(request, reply)
    })
    fastify.post("/pedido", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new CreateOrderController().handle(request, reply)
    })
    fastify.get("/produtos", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new ListProductsController().handle(request, reply)
    })
    fastify.post("/produto", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new CreateProductController().handle(request, reply)
    })
    fastify.get("/pedidos", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new ListOrdersController().handle(request, reply)
    })
    fastify.get("/clientes", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new ListCustomersController().handle(request, reply)
    })
    fastify.delete("/cliente", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new DeleteCustomerController().handle(request, reply)
    })
}

// まっすぐ自分の言葉は曲げねぇ...オレの忍道だ!