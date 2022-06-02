import { BusMessage } from "../BusMessage";
import { BusResponse } from "../BusResponse";
import { Handler } from "../Handler";

export class RegisteredInMemoryHandler<T extends BusMessage, S extends BusResponse> {
    constructor(
        readonly Name: string, 
        readonly Handler: Handler<T,S>
    ) { }
}