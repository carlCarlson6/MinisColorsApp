import { Paint } from "../core/entities/Paint";
import { IPaintsRepository } from "../core/services/IPaintsRepository";

export class GetAllEquivalentPaints {
    private repository: IPaintsRepository;

    constructor(paintsRepository: IPaintsRepository) {
        this.repository = paintsRepository;
    }

    public async Execute(paintName: String): Promise<Array<Paint>> {
        const paint: Paint = await this.repository.ReadByName(paintName);
        const equivalentPaints: Array<Paint> = await this.repository.ReadByColor(paint.Color);
        return equivalentPaints;
    }

}