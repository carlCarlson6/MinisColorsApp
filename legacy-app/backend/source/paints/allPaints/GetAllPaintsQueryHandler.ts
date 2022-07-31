import { inject, injectable } from "inversify";
import { Handler } from "../../bus/Handler";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";
import { AllPaints } from "./AllPaints";
import { GetAllPaints } from "./GetAllPaints";
import { GetAllPaintsQuery } from "./GetAllPaintsQuery";

@injectable()
export class GetAllPaintsQueryHandler implements Handler<GetAllPaintsQuery, AllPaints> {
    constructor(
        @inject(InjectionTypes.GetAllPaints)
        private readonly useCase: GetAllPaints
    ) { }

    public async Handle(_: GetAllPaintsQuery): Promise<AllPaints> {
        const allPaints = await this.useCase.Execute();
        return AllPaints.FromPaints(allPaints);
    }

}
