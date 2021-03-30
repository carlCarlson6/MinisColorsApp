import { Paint } from "../../core/entities/Paint";
import { PaintName } from "../../core/valueObjects/PaintName";
import { PaintDto } from "../common/PaintDto";
import { AllEquivalentPaints } from "./AllEquivalentPaints";
import { GetAllEquivalentPaints } from "./GetAllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "./GetAllEquivalentPaintsQuery";

export class GetAllEquivalentPaintsQueryHandler {
    private readonly useCase: GetAllEquivalentPaints;

    constructor(getAllEquivalentPaints: GetAllEquivalentPaints) {
        this.useCase = getAllEquivalentPaints;
    }

    public async Handle(query: GetAllEquivalentPaintsQuery): Promise<AllEquivalentPaints> {
        const paintName: PaintName = new PaintName(query.PaintName);
        
        const equivalentPaints: Array<Paint> = await this.useCase.Execute(paintName);
        
        const dtos: Array<PaintDto> = equivalentPaints.map(paint => new PaintDto(paint));
        return new AllEquivalentPaints(dtos);
    }

}