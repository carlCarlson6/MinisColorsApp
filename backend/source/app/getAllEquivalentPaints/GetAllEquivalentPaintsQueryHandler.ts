import { inject, injectable } from "inversify";
import { Handler } from "../../core/services/bus/Handler";
import { PaintName } from "../../core/valueObjects/PaintName";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";
import { AllEquivalentPaints } from "./AllEquivalentPaints";
import { GetAllEquivalentPaints } from "./GetAllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "./GetAllEquivalentPaintsQuery";

@injectable()
export class GetAllEquivalentPaintsQueryHandler implements Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints> {
    constructor(
        @inject(InjectionTypes.GetAllEquivalentPaints) 
        private readonly useCase: GetAllEquivalentPaints
    ) { }

    public async Handle(query: GetAllEquivalentPaintsQuery): Promise<AllEquivalentPaints> {
        const paintName: PaintName = new PaintName(query.PaintName);
        const equivalentPaints = await this.useCase.Execute(paintName);
        return AllEquivalentPaints.FromPaints(equivalentPaints);
    }
}