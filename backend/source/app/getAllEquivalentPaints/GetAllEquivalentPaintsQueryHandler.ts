import { Paint } from "../../core/entities/Paint";
import { PaintName } from "../../core/valueObjects/PaintName";
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
        
        return new AllEquivalentPaints(equivalentPaints);
    }

}