import { Paint } from "../../core/entities/Paint";
import { Handler } from "../../core/services/Handler";
import { PaintDto } from "../common/PaintDto";
import { AllPaints } from "./AllPaints";
import { GetAllPaints } from "./GetAllPaints";
import { GetAllPaintsQuery } from "./GetAllPaintsQuery";

export class GetAllPaintsQueryHandler implements Handler<GetAllPaintsQuery, AllPaints> {
    private readonly useCase: GetAllPaints;

    constructor(useCase: GetAllPaints) {
        this.useCase = useCase;
    }

    public async Handle(query: GetAllPaintsQuery): Promise<AllPaints> {
        const allPaints: Array<Paint> = await this.useCase.Execute();

        const allDtos = allPaints.map(paint => new PaintDto(paint));
        return new AllPaints(allDtos);
    }

}