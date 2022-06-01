import { BusMessage } from "../core/services/repositories/BusMessage";
import { GetPaintsByColor } from "./GetPaintsByColor";

export class GetPaintsByColorQuery implements BusMessage {
    public readonly MessageName: string = GetPaintsByColor.name;
    public readonly HexadecimalCode: string

    constructor(hexadecimalCode: string) { 
        this.HexadecimalCode = hexadecimalCode.toUpperCase();
    }
}