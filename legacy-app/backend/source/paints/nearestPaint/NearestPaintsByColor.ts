import { BusResponse } from "../../bus/BusResponse";
import { PaintDto, Paint } from "../Paint";

export class NearestPaintsByColor implements BusResponse {
    constructor(
        readonly NearestPaints: PaintDto[]
    ) { }

    public static FromPaints(paints: Paint[]): NearestPaintsByColor {
        const dtos =  PaintDto.FromPaints(paints);
        return new NearestPaintsByColor(dtos);
    }
}