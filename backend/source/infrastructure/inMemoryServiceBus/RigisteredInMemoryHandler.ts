import { Handler } from "../../core/services/Handler";

export class RegisteredInMemoryHandler<T> {
    
    public get Name(): string {
        return this.name;
    }

    public get Handler(): Handler<T> {
        return this.handler;
    }

    constructor(private readonly name: string, private readonly handler: Handler<T>) {}
}