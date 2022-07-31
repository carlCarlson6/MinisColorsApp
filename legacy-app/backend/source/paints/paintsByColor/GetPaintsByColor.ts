import { inject, injectable } from "inversify";
import { Color } from "../colorSystem/Color";
import { PaintsRepository } from "../services/PaintsRepository";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";
import { Paint } from "../Paint";

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