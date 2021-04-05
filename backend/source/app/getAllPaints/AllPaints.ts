import { Paint } from "../../core/entities/Paint";
import { PaintDto } from "../common/PaintDto";

export class AllPaints {
    public get AlllPaints(): Array<PaintDto> {
        return this.paints;
    }

    constructor(private readonly paints: Array<PaintDto>) { }
}