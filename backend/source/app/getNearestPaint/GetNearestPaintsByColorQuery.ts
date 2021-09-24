import { BusMessage } from "../../core/services/BusMessage";

export class GetNearestPaintsByColorQuery implements BusMessage {

    public get HexadecimalCode(): string {
        return this.hexadecimalCode;
    }

    public readonly MessageName: string = GetNearestPaintsByColorQuery.name;

    constructor(
        private readonly hexadecimalCode: string
    ) { }
    
}