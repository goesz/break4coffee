import prismaClient from "../prisma";

class InventoryService {
    async execute(productId: string, status: string) {
        if (status !== "enabled" && status !== "disabled") {
            throw new Error("Status inválido. Utilize 'enabled' ou 'disabled'.");
        }


        const updatedProduct = await prismaClient.produto.update({
            where: { id: productId },
            data: { status: status },
        });

        return updatedProduct;
    }
}

export { InventoryService };
