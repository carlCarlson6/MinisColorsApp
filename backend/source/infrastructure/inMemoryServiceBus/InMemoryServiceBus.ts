import { Handler } from "../../core/services/Handler";
import { ServiceBus } from "../../core/services/ServiceBus";
import { InMemoryHandlers } from "./InMemoryHandlers";

export class InMemoryServiceBus implements ServiceBus {
    private readonly handlers: InMemoryHandlers;

    constructor() {
        this.handlers = new InMemoryHandlers();
    }

    public async Dispatch<T, S>(message: T&Function): Promise<S> {
        const handler: Handler<T,S> = this.handlers.getHandler(message.name);
        
        throw new Error("Method not implemented.");
    }

    public Register<T,S>(handler: Handler<T,S>, handlerName: string): void {
        this.handlers.Register(handlerName, handler);
    }

}