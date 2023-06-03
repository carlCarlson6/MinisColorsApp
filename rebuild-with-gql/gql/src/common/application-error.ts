import { GraphQLError } from "graphql";
import { v4 as uuIdV4 } from "uuid";

export class ApplicationError extends Error {
    private readonly id: string;

    constructor(
        readonly message: string,
        readonly code: string,
    ) {
        super(message);
        this.id = uuIdV4();
    }

    public ToGqlError() {
        return new GraphQLError(this.message) // TODO WIP
    }
}