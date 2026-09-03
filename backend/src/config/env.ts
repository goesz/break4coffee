import "dotenv/config";

const JWT_PASS = process.env.JWT_PASS;

if (!JWT_PASS) {
    throw new Error("JWT_PASS not  found");
}

export const env = {
    JWT_PASS
};