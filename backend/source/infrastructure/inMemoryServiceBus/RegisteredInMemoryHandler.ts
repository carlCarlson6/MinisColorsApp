import { BusResponse } from "../../core/services/bus/BusResponse";
import { BusMessage } from "../../core/services/repositories/BusMessage";
import { Handler } from "../../core/services/bus/Handler";

export class RegisteredInMemoryHandler<T extends BusMessage, S extends BusResponse> {
    constructor(
        readonly Name: string, 
        readonly Handler: Handler<T,S>
    ) { }
}