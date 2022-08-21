import { MiddlewareFn } from "type-graphql";

export const errorHandler: MiddlewareFn = async ({ context, info }, next) => {
    try {
        return await next();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}