import { Paint } from "../../core/entities/Paint";
import { PaintDto } from "../common/PaintDto";

export class AllPaints {
    public get AlllPaints(): PaintDto[] {
        return this.paints;
    }

    constructor(
        private readonly paints: PaintDto[]
    ) { }

    public static FromPaints(paints: Paint[]) {
        const allDtos = PaintDto.FromPaints(paints);
        return new AllPaints(allDtos);
    }
}