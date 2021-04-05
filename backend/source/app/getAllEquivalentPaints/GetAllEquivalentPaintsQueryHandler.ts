import { inject, injectable } from "inversify";
import { Paint } from "../../core/entities/Paint";
import { Handler } from "../../core/services/Handler";
import { PaintName } from "../../core/valueObjects/PaintName";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";
import { PaintDto } from "../common/PaintDto";
import { AllEquivalentPaints } from "./AllEquivalentPaints";
import { GetAllEquivalentPaints } from "./GetAllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "./GetAllEquivalentPaintsQuery";

@injectable()
export class GetAllEquivalentPaintsQueryHandler implements Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints> {
    private readonly useCase: GetAllEquivalentPaints;

    constructor(@inject(InjectionTypes.GetAllEquivalentPaints) getAllEquivalentPaints: GetAllEquivalentPaints) {
        this.useCase = getAllEquivalentPaints;
    }

    public async Handle(query: GetAllEquivalentPaintsQuery): Promise<AllEquivalentPaints> {
        const paintName: PaintName = new PaintName(query.PaintName);
        
        const equivalentPaints: Array<Paint> = await this.useCase.Execute(paintName);
        
        const dtos: Array<PaintDto> = equivalentPaints.map(paint => new PaintDto(paint));
        return new AllEquivalentPaints(dtos);
    }

}