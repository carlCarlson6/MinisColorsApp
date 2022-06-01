import { Paint } from "../core/entities/Paint";
import { BusResponse } from "../core/services/bus/BusResponse";
import { PaintDto } from "../common/PaintDto";

export class NearestPaintsByColor implements BusResponse {
    constructor(
        readonly NearestPaints: PaintDto[]
    ) { }

    public static FromPaints(paints: Paint[]): NearestPaintsByColor {
        const dtos =  PaintDto.FromPaints(paints);
        return new NearestPaintsByColor(dtos);
    }
}