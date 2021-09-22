import { inject, injectable } from "inversify";
import { Paint } from "../../core/entities/Paint";
import { PaintsRepository } from "../../core/services/PaintsRepository";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";

@injectable()
export class GetAllPaints {
    private Repository: PaintsRepository;

    constructor(@inject(InjectionTypes.PaintsRepository) paintsRepository: PaintsRepository) {
        this.Repository = paintsRepository;
    }

    public async Execute(): Promise<Array<Paint>> {
        const paints: Array<Paint> =  await this.Repository.ReadAll();
        return paints;
    }

}
