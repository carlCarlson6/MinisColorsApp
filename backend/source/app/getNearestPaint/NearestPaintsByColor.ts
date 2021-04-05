import { PaintDto } from "../common/PaintDto";

export class NearestPaintsByColor {

    public get NearestPaints(): Array<PaintDto> {
        return this.nearestPaints;
    }

    constructor(private readonly nearestPaints: Array<PaintDto>) { }
}