import { BusMessage } from "../../core/services/BusMessage";
import { BusResponse } from "../../core/services/BusResponse";
import { Handler } from "../../core/services/Handler";
import { ServiceBus } from "../../core/services/ServiceBus";
import { InMemoryHandlers } from "./InMemoryHandlers";

export class InMemoryServiceBus implements ServiceBus {
    private readonly handlers: InMemoryHandlers;

    constructor() {
        this.handlers = new InMemoryHandlers();
    }

    public async Dispatch<T extends BusMessage, S extends BusResponse>(message: T): Promise<S> {
        const handler: Handler<T,S> = this.handlers.FindHandler(message.MessageName);
        const handlerResponse: S = await handler.Handle(message);
        return handlerResponse;
    }

    public Register<T extends BusMessage, S extends BusResponse>(handler: Handler<T,S>, handlerName: string): void {
        this.handlers.Add(handlerName, handler);
    }

}
