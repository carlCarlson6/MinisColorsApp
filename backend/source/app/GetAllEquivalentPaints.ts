import { inject, injectable } from "inversify";
import { Paint } from "../core/entities/Paint";
import { IPaintsRepository } from "../core/services/IPaintsRepository";

@injectable()
export class GetAllEquivalentPaints {
    private repository: IPaintsRepository;

    constructor(@inject('IPaintsRepository') paintsRepository: IPaintsRepository) {
        this.repository = paintsRepository;
    }

    public async Execute(paintName: String): Promise<Array<Paint>> {
        const paints: Array<Paint> = await this.repository.ReadByName(paintName);
        if(paints.length == 0) {
            return [];
        }

        const paint: Paint = paints[0];

        const equivalentPaints: Array<Paint> = await this.repository.ReadByColor(paint.Color);
        return equivalentPaints;
    }

}