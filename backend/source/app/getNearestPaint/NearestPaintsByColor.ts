import { BusResponse } from "../../core/services/BusResponse";
import { PaintDto } from "../common/PaintDto";

export class NearestPaintsByColor implements BusResponse {

    public get NearestPaints(): Array<PaintDto> {
        return this.nearestPaints;
    }

    constructor(
        private readonly nearestPaints: Array<PaintDto>
    ) { }

}