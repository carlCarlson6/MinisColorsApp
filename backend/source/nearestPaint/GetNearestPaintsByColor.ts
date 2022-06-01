import { inject, injectable } from "inversify";
import { Color } from "../core/entities/Color";
import { Paint } from "../core/entities/Paint";
import { PaintsRepository } from "../core/services/repositories/PaintsRepository";
import { NearestColorFinder } from "../core/services/NearestColorFinder";
import { InjectionTypes } from "../infrastructure/di/InjectionTypes";

@injectable()
export class GetNearestPaintsByColor {
    constructor(
        @inject(InjectionTypes.NearestColorFinder) 
        private readonly finder: NearestColorFinder, 
        @inject(InjectionTypes.PaintsRepository) 
        private readonly repository: PaintsRepository
    ) { }

    public async Execute(color: Color): Promise<Paint[]> {
        const nearestColor = await this.finder.FindNearest(color);
        const paints = await this.repository.ReadByColor(nearestColor);
        return paints;
    }
}