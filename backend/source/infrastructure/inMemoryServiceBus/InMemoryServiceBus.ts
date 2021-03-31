import { ServiceBus } from "../../core/services/ServiceBus";

export class InMemoryServiceBus implements ServiceBus {
    
    Dispatch<T, S>(message: T&Function): Promise<S> {
        
        throw new Error("Method not implemented.");
    }

}