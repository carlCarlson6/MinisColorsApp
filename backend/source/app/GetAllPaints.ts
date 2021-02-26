import { inject, injectable } from "inversify";
import { Paint } from "../core/entities/Paint";
import { IPaintsRepository } from "../core/services/IPaintsRepository";

@injectable()
export class GetAllPaints {

    private Repository: IPaintsRepository;

    constructor(@inject('IPaintsRepository') paintsRepository: IPaintsRepository) {
        this.Repository = paintsRepository;
    }

    public async Execute(): Promise<Array<Paint>> {
        const paints: Array<Paint> =  await this.Repository.ReadAll();
        return paints;
    }

} 