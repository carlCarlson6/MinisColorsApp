import { inject, injectable } from "inversify";
import { ColorFactory } from "../core/services/ColorFactory";
import { InjectionTypes } from "../infrastructure/di/InjectionTypes";
import { GetPaintsByColor } from "./GetPaintsByColor";
import { GetPaintsByColorQuery } from "./GetPaintsByColorQuery";
import { PaintsByColor } from "./PaintsByColor";

@injectable()
export class GetPaintsByColorQueryHandler {
    private readonly colorFactory = new ColorFactory();

    constructor(
        @inject(InjectionTypes.GetPaintsByColor) 
        private readonly useCase: GetPaintsByColor
    ) { }

    public async Handle(query: GetPaintsByColorQuery): Promise<PaintsByColor> {
        const color = this.colorFactory.BuildFromHexadecial(query.HexadecimalCode);
        const paints = await this.useCase.Execute(color);
        return PaintsByColor.FromPaints(paints);
    }
}