import { inject, injectable } from "inversify";
import { Color } from "../../core/entities/Color";
import { Paint } from "../../core/entities/Paint";
import { PaintsRepository } from "../../core/services/PaintsRepository";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";

@injectable()
export class GetPaintsByColor {
    private Repository: PaintsRepository;

    constructor(@inject(InjectionTypes.PaintsRepository) paintsRepository: PaintsRepository) {
        this.Repository = paintsRepository;
    }

    public async Execute(color: Color): Promise<Array<Paint>> {
        const paints: Array<Paint> = await this.Repository.ReadByColor(color);
        return paints;
    }

}