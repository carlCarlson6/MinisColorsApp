import { Mediator } from "tsmediator";
import { ServiceBus } from "../../core/services/ServiceBus";

export class TsMediatorServiceBus implements ServiceBus {
    private readonly mediator: Mediator;
    
    constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    Dispatch<T, S>(message: T&Function): Promise<S> {
        const messageName: string = message.name;
        
        const response: S = this.mediator.Send(messageName, message)

        throw new Error("Method not implemented.");
    }
}