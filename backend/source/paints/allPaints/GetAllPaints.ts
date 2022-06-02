import { inject, injectable } from "inversify";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";
import { Paint } from "../Paint";
import { PaintsRepository } from "../services/PaintsRepository";

@injectable()
export class GetAllPaints {
    constructor(
        @inject(InjectionTypes.PaintsRepository)
        private readonly repository: PaintsRepository
    ) { }

    public async Execute(): Promise<Array<Paint>> {
        const paints =  await this.repository.ReadAll();
        return paints;
    }
}