import fastify, { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomersController } from "./controllers/ListCustomersController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { CreateOrderController } from "./controllers/CreateOrderController";
import { ListOrdersController } from "./controllers/ListOrdersController";
import { LoginController } from "./controllers/LoginController";
import { ListProductsController } from "./controllers/ListProductsController";
import { CreateProductController } from "./controllers/CreateProductController";
import { InventoryController } from "./controllers/InventoryController";
import { ShowUserController } from "./controllers/ShowUserController";

// --
export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })
    fastify.get('/user/profile', async (request: FastifyRequest, reply: FastifyReply) => {
        return new ShowUserController().handle(request, reply);
    });
    fastify.post("/inventory", async (request: FastifyRequest, reply: FastifyReply) =>{
        return new InventoryController().handle(request, reply)
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