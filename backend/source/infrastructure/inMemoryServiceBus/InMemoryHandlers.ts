import { Handler } from "../../core/services/Handler";
import { RegisteredInMemoryHandler } from "./RigisteredInMemoryHandler";

export class InMemoryHandlers {
    private readonly registeredHandlers: Array<RegisteredInMemoryHandler<any>>;

    constructor() {
        this.registeredHandlers = [];
    }

    public Register<T>(handlerName: string, handler: Handler<T>): void {
        const registeredHandler = new RegisteredInMemoryHandler<T>(handlerName, handler);
        this.registeredHandlers.push(registeredHandler);
    }

    public getHandler<T>(name: string): Handler<T> {
        const registeredHandler: RegisteredInMemoryHandler<T> | undefined = this.registeredHandlers.find(r => r.Name === name);
        if (!registeredHandler) {
            throw new Error("handler " + name + " does not exist");
        }
        return registeredHandler.Handler;
    }

}