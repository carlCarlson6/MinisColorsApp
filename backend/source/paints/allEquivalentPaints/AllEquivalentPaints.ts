import { BusResponse } from "../../bus/BusResponse";
import { Paint, PaintDto } from "../Paint";

export class AllEquivalentPaints implements BusResponse {
    constructor(
        readonly EquivalentPaints: PaintDto[]
    ) { }
    
    public static FromPaints(paints: Paint[]) {
        const dtos = PaintDto.FromPaints(paints);
        return new AllEquivalentPaints(dtos);
    }
}