import { errorHandler } from "./error-handler";

export const middlewares = [
    errorHandler
] as const;