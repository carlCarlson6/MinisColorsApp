import { inject, injectable } from "inversify";
import { Color } from "../colorSystem/Color";
import { PaintsRepository } from "../services/PaintsRepository";
import { NearestColorFinder } from "../services/NearestColorFinder";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";
import { Paint } from "../Paint";

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