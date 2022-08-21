import { ApolloError } from "apollo-server";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { v4 as uuidV4 } from "uuid";
import { ApplicationError } from "../../core/application-error";

export const errorFormatter: (error: GraphQLError) => GraphQLFormattedError<Record<string, any>> = (error) => {
    const originalError = error.originalError;
    if (originalError instanceof ApolloError) return error;
    if (originalError instanceof ApplicationError) return new GraphQLError(originalError.message) // TODO WIP

    const errorId = uuidV4();
    console.log("error-id: ", errorId, "error: ", error);    
    return new GraphQLError(`Internal Error: ${errorId}`)
}