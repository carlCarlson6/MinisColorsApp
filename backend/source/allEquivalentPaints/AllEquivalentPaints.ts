import { Paint } from "../core/entities/Paint";
import { BusResponse } from "../core/services/bus/BusResponse";
import { PaintDto } from "../common/PaintDto";

export class AllEquivalentPaints implements BusResponse {
    constructor(
        readonly EquivalentPaints: PaintDto[]
    ) { }
    
    public static FromPaints(paints: Paint[]) {
        const dtos = PaintDto.FromPaints(paints);
        return new AllEquivalentPaints(dtos);
    }
}