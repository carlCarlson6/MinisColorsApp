import { BusMessage } from "../../bus/BusMessage";
import { GetNearestPaintsByColor } from "./GetNearestPaintsByColor";

export class GetNearestPaintsByColorQuery implements BusMessage {
    public readonly MessageName: string = GetNearestPaintsByColor.name;
    public readonly HexadecimalCode: string

    constructor(hexadecimalCode: string) { 
        this.HexadecimalCode = hexadecimalCode.toUpperCase().replace("#", "");
    }
}