import { BusResponse } from "../../core/services/BusResponse";
import { PaintDto } from "../common/PaintDto";

export class PaintsByColor implements BusResponse {

    public get Paints(): Array<PaintDto> {
        return this.paints;
    }

    constructor(
        private readonly paints: Array<PaintDto>
    ) { }

}
