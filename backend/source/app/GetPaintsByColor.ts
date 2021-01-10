import { Color } from "../core/entities/Color";
import { Paint } from "../core/entities/Paint";
import { IPaintsRepository } from "../core/services/IPaintsRepository";

export class GetPaintsByColor {
    private Repository: IPaintsRepository;

    constructor(paintsRepository: IPaintsRepository) {
        this.Repository = paintsRepository;
    }

    public async Execute(color: Color): Promise<Array<Paint>> {
        const paints: Array<Paint> = await this.Repository.Read(color);
        return paints;
    }

}