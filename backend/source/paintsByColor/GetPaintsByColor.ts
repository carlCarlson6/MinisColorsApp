import { inject, injectable } from "inversify";
import { Color } from "../core/entities/Color";
import { Paint } from "../core/entities/Paint";
import { PaintsRepository } from "../core/services/repositories/PaintsRepository";
import { InjectionTypes } from "../infrastructure/di/InjectionTypes";

@injectable()
export class GetPaintsByColor {
    constructor(
        @inject(InjectionTypes.PaintsRepository)
        private readonly repository: PaintsRepository,
    ) { }

    public async Execute(color: Color): Promise<Paint[]> {
        return await this.repository.ReadByColor(color);
    }
}