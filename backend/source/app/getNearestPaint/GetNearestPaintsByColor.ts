import { inject, injectable } from "inversify";
import { Color } from "../../core/entities/Color";
import { Paint } from "../../core/entities/Paint";
import { PaintsRepository } from "../../core/services/PaintsRepository";
import { NearestColorFinder } from "../../core/services/NearestColorFinder";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";

@injectable()
export class GetNearestPaintsByColor {
    private finder: NearestColorFinder;
    private repository: PaintsRepository;

    constructor(
        @inject(InjectionTypes.NearestColorFinder) nearestColorFinder: NearestColorFinder, 
        @inject(InjectionTypes.PaintsRepository) paintsRepository: PaintsRepository
    ) {
        this.finder = nearestColorFinder;
        this.repository = paintsRepository;
    }

    public async Execute(color: Color): Promise<Array<Paint>> {
        const nearestColor: Color = await this.finder.FindNearest(color);
        const paints: Array<Paint> = await this.repository.ReadByColor(nearestColor);
        return paints;
    }

}
