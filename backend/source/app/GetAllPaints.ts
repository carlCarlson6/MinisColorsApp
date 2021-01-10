import { Paint } from "../core/entities/Paint";
import { IPaintsRepository } from "../core/services/IPaintsRepository";

export class GetAllPaints {

    private Repository: IPaintsRepository;

    constructor(paintsRepository: IPaintsRepository) {
        this.Repository = paintsRepository;
    }

    public async Execute(): Promise<Array<Paint>> {
        const paint: Array<Paint> =  await this.Repository.ReadAll();
        return paint;
    }

} 