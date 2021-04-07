import { inject, injectable } from "inversify";
import { Paint } from "../../core/entities/Paint";
import { ColorFactory } from "../../core/services/ColorFactory";
import { Handler } from "../../core/services/Handler";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";
import { PaintDto } from "../common/PaintDto";
import { GetNearestPaintsByColor } from "./GetNearestPaintsByColor";
import { GetNearestPaintsByColorQuery } from "./GetNearestPaintsByColorQuery";
import { NearestPaintsByColor } from "./NearestPaintsByColor";

@injectable()
export class GetNearestPaintsByColorQueryHandler implements Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor> {
    private readonly useCase: GetNearestPaintsByColor;
    private readonly colorFactory: ColorFactory;

    constructor(@inject(InjectionTypes.GetNearestPaintsByColor) getNearestPaintsByColor: GetNearestPaintsByColor) {
        this.useCase = getNearestPaintsByColor;
        this.colorFactory = new ColorFactory();
    }

    public async Handle(query: GetNearestPaintsByColorQuery): Promise<NearestPaintsByColor> {
        const colorToSearchBy = this.colorFactory.BuildFromHexadecial(query.HexadecimalCode);

        const nearestPaints: Array<Paint> = await this.useCase.Execute(colorToSearchBy);
        
        const dtos: Array<PaintDto> = nearestPaints.map(paint => new PaintDto(paint));
        return new NearestPaintsByColor(dtos);
    }
}