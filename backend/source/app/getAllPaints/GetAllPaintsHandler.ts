import { Paint } from "../../core/entities/Paint";
import { PaintDto } from "../common/PaintDto";
import { AllPaints } from "./AllPaints";
import { GetAllPaints } from "./GetAllPaints";

export class GetAllPaintsHandler {
    private readonly useCase: GetAllPaints;

    constructor(useCase: GetAllPaints) {
        this.useCase = useCase;
    }

    public async Handle(): Promise<AllPaints> {
        const allPaints: Array<Paint> = await this.useCase.Execute();

        const allDtos = allPaints.map(paint => new PaintDto(paint));
        return new AllPaints(allDtos);
    }

}