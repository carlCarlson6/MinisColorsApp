import { BusMessage } from "./BusMessage";
import { BusResponse } from "./BusResponse";

export interface ServiceBus {
    Dispatch<T extends BusMessage, S extends BusResponse>(message: T): Promise<S>; 
}
