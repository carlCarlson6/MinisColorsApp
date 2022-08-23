import { MiddlewareFn } from "type-graphql";

export const logger: MiddlewareFn = async ({context, info}, next) => {
    try {
        console.log("context: ", context);
        console.log("info: ", info);
        return await next();
    }
    catch (error) {
        console.log("error:", error);
        throw error;
    }
}