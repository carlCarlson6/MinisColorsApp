import { ApolloError } from "apollo-server";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { v4 as uuidV4 } from "uuid";
import { ApplicationError } from "../../common/application-error";

const formatUncontrolledError = (error: GraphQLError) => {
    const errorId = uuidV4();
    console.log("UNCONTROLLED ERROR - ", "error-id: ", errorId, "error: ", error);    
    return new GraphQLError(`Internal Error: ${errorId}`);
}


export const errorFormatter: (error: GraphQLError) => GraphQLFormattedError<Record<string, any>> = (error) => {
    const originalError = error.originalError;
    if (originalError instanceof ApolloError) return error;
    if (originalError instanceof ApplicationError) return originalError.ToGqlError();
    return formatUncontrolledError(error);
}