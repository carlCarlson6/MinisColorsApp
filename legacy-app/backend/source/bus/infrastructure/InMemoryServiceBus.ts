import { BusMessage } from "../BusMessage";
import { BusResponse } from "../BusResponse";
import { Handler } from "../Handler";
import { ServiceBus } from "../ServiceBus";
import { RegisteredInMemoryHandler } from "./RegisteredInMemoryHandler";

export class InMemoryServiceBus implements ServiceBus {
    private readonly registeredHandlers: Array<RegisteredInMemoryHandler<any,any>> = [];

    public async Dispatch<T extends BusMessage, S extends BusResponse>(message: T): Promise<S> {
        const handler: Handler<T,S> = this.FindHandler(message.MessageName);
        const handlerResponse = await handler.Handle(message);
        return handlerResponse;
    }

    public FindHandler<T extends BusMessage, S extends BusResponse>(name: string): Handler<T,S> {
        const registeredHandler = this.registeredHandlers.find(r => r.Name === name);
        if (!registeredHandler) {
            throw new Error("".concat("handler ", name, " does not exist"));
        }

        return registeredHandler.Handler;
    }

    public Register<T extends BusMessage, S extends BusResponse>(handler: Handler<T,S>, handlerName: string): void {
        const registeredHandler = new RegisteredInMemoryHandler<T,S>(handlerName, handler);
        this.registeredHandlers.push(registeredHandler);
    }
}