import { GraphQLError } from "graphql";
import { v4 as uuIdV4 } from "uuid";

export class ApplicationError extends Error {
    constructor(
        readonly id: string,
        readonly message: string,
        readonly code: string,
    ) {
        super(message);
        id = uuIdV4();
    }

    public ToGqlError() {
        return new GraphQLError(this.message) // TODO WIP
    }
}