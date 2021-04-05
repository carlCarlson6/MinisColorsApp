import { Handler } from "../../core/services/Handler";
import { ServiceBus } from "../../core/services/ServiceBus";
import { nameOf } from "../../utils/NameOf";
import { InMemoryHandlers } from "./InMemoryHandlers";

export class InMemoryServiceBus implements ServiceBus {
    private readonly handlers: InMemoryHandlers;

    constructor() {
        this.handlers = new InMemoryHandlers();
    }

    public async Dispatch<T, S>(message: T): Promise<S> {
        const handler: Handler<T,S> = this.handlers.FindHandler(nameOf(message));
        const handlerResponse: S = await handler.Handle(message);
        return handlerResponse;
    }

    public Register<T,S>(handler: Handler<T,S>, handlerName: string): void {
        this.handlers.Add(handlerName, handler);
    }

}
