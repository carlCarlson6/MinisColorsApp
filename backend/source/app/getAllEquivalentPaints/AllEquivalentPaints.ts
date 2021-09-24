import { BusResponse } from "../../core/services/BusResponse";
import { PaintDto } from "../common/PaintDto";

export class AllEquivalentPaints implements BusResponse {

    public get EquivalentPaints(): Array<PaintDto> {
        return this.equivalentPaints;
    }

    constructor(
        private readonly equivalentPaints: Array<PaintDto>
    ) {}

}
