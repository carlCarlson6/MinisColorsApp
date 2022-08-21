export class ApplicationError extends Error {
    constructor(
        readonly message: string,
        readonly code: string,
    ) {
        super(message);
    }
}