import { Color } from "../core/entities/Color";
import { Paint } from "../core/entities/Paint";
import { IPaintsRepository } from "../core/services/IPaintsRepository";
import { NearestColorFinder } from "../core/services/NearestColorFinder";

export class GetNearestPaintByColor {
    private finder: NearestColorFinder;
    private repository: IPaintsRepository;

    constructor(nearestColorFinder: NearestColorFinder, paintsRepository: IPaintsRepository) {
        this.finder = nearestColorFinder;
        this.repository = paintsRepository;
    }

    public async Execute(color: Color): Promise<Array<Paint>> {
        const nearestColor: Color = await this.finder.FindNearest(color);
        const paints: Array<Paint> = await this.repository.ReadByColor(nearestColor);
        return paints;
    }

}