import { BusMessage } from "../../core/services/repositories/BusMessage";
import { GetNearestPaintsByColor } from "./GetNearestPaintsByColor";

export class GetNearestPaintsByColorQuery implements BusMessage {
    public readonly MessageName: string = GetNearestPaintsByColor.name;

    constructor(
        readonly HexadecimalCode: string
    ) { }
}