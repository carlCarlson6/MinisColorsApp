import { Handler } from "../../core/services/Handler";
import { RegisteredInMemoryHandler } from "./RegisteredInMemoryHandler";

export class InMemoryHandlers {
    private readonly registeredHandlers: Array<RegisteredInMemoryHandler<any,any>>;

    constructor() {
        this.registeredHandlers = [];
    }

    public Add<T,S>(handlerName: string, handler: Handler<T,S>): void {
        const registeredHandler = new RegisteredInMemoryHandler<T,S>(handlerName, handler);
        this.registeredHandlers.push(registeredHandler);
    }

    public FindHandler<T,S>(name: string): Handler<T,S> {
        const registeredHandler: RegisteredInMemoryHandler<T,S> | undefined = this.registeredHandlers.find(r => r.Name === name);
        if (!registeredHandler) {
            throw new Error("".concat("handler ", name, " does not exist"));
        }
        return registeredHandler.Handler;
    }

}
