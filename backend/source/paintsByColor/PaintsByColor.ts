import { Paint } from "../core/entities/Paint";
import { BusResponse } from "../core/services/bus/BusResponse";
import { PaintDto } from "../common/PaintDto";

export class PaintsByColor implements BusResponse {
    constructor(
        readonly Paints: PaintDto[]
    ) { }

    public static FromPaints(paints: Paint[]): PaintsByColor {
        const dtos = PaintDto.FromPaints(paints);
        return new PaintsByColor(dtos);
    }
}