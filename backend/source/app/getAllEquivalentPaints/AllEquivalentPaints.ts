import { PaintDto } from "../common/PaintDto";

export class AllEquivalentPaints {

    public get EquivalentPaints(): Array<PaintDto> {
        return this.equivalentPaints;
    }

    constructor(
        private readonly equivalentPaints: Array<PaintDto>
    ) {}

}
