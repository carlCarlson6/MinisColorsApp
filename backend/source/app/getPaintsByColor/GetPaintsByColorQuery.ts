import { BusMessage } from "../../core/services/BusMessage";

export class GetPaintsByColorQuery implements BusMessage {
    
    public get HexadecimalCode(): string {
        return this.hexadecimalCode;
    }

    public readonly MessageName: string = GetPaintsByColorQuery.name;

    constructor(
        private readonly hexadecimalCode: string
    ) { }
    
}