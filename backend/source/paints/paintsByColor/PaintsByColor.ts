import { BusResponse } from "../../bus/BusResponse";
import { PaintDto, Paint } from "../Paint";

export class PaintsByColor implements BusResponse {
    constructor(
        readonly Paints: PaintDto[]
    ) { }

    public static FromPaints(paints: Paint[]): PaintsByColor {
        const dtos = PaintDto.FromPaints(paints);
        return new PaintsByColor(dtos);
    }
}