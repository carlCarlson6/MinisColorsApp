import { BusMessage } from "../../core/services/BusMessage";
import { BusResponse } from "../../core/services/BusResponse";
import { Handler } from "../../core/services/Handler";

export class RegisteredInMemoryHandler<T extends BusMessage, S extends BusResponse> {
    
    public get Name(): string {
        return this.name;
    }

    public get Handler(): Handler<T,S> {
        return this.handler;
    }

    constructor(
        private readonly name: string, 
        private readonly handler: Handler<T,S>
    ) {}
}
