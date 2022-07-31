import { BusMessage } from "./BusMessage";
import { BusResponse } from "./BusResponse";

export interface Handler<T extends BusMessage, S extends BusResponse> {
    Handle(message: T): Promise<S>
}