import { BusMessage } from "../../core/services/repositories/BusMessage";

export class GetPaintsByColorQuery implements BusMessage {
    public readonly MessageName: string = GetPaintsByColorQuery.name;

    constructor(
        readonly HexadecimalCode: string
    ) { }
}