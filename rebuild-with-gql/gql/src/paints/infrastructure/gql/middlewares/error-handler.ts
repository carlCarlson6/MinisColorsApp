import { ASTNode, formatError, GraphQLError, Source, SourceLocation } from "graphql";
import { MiddlewareFn } from "type-graphql";

export const errorHandler: MiddlewareFn = async ({ context, info }, next) => {
    try {
        return await next();
    }
    catch (error) {
        // TODO properly format error
        console.log(error);
        throw error;
    }
}