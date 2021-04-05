import { PaintDto } from "../common/PaintDto";

export class PaintsByColor {

    public get Paints(): Array<PaintDto> {
        return this.paints;
    }

    constructor(private readonly paints: Array<PaintDto>) { }
}