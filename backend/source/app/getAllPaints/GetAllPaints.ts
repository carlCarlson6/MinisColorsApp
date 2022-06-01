import { inject, injectable } from "inversify";
import { Paint } from "../../core/entities/Paint";
import { PaintsRepository } from "../../core/services/repositories/PaintsRepository";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";

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