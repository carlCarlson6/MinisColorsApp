import { inject, injectable } from "inversify";
import { ColorFactory } from "../services/ColorFactory";
import { Handler } from "../../bus/Handler";
import { GetNearestPaintsByColor } from "./GetNearestPaintsByColor";
import { GetNearestPaintsByColorQuery } from "./GetNearestPaintsByColorQuery";
import { NearestPaintsByColor } from "./NearestPaintsByColor";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";

@injectable()
export class GetNearestPaintsByColorQueryHandler implements Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor> {
    private readonly colorFactory: ColorFactory = new ColorFactory();

    constructor(
        @inject(InjectionTypes.GetNearestPaintsByColor) 
        private readonly useCase: GetNearestPaintsByColor
    ) { }

    public async Handle(query: GetNearestPaintsByColorQuery): Promise<NearestPaintsByColor> {
        const colorToSearchBy = this.colorFactory.BuildFromHexadecial(query.HexadecimalCode);
        const nearestPaints = await this.useCase.Execute(colorToSearchBy);
        return NearestPaintsByColor.FromPaints(nearestPaints);
    }
}