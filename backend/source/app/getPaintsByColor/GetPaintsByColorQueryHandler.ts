import { Color } from "../../core/entities/Color";
import { Paint } from "../../core/entities/Paint";
import { ColorFactory } from "../../core/services/ColorFactory";
import { PaintDto } from "../common/PaintDto";
import { GetPaintsByColor } from "./GetPaintsByColor";
import { GetPaintsByColorQuery } from "./GetPaintsByColorQuery";
import { PaintsByColor } from "./PaintsByColor";

export class GetPaintsByColorQueryHandler {
    private readonly useCase: GetPaintsByColor;
    private readonly colorFactory: ColorFactory;

    constructor(getPaintsByColor: GetPaintsByColor) {
        this.useCase = getPaintsByColor;
        this.colorFactory = new ColorFactory();
    }

    public async Handle(query: GetPaintsByColorQuery): Promise<PaintsByColor> {
        const color: Color = this.colorFactory.BuildFromHexadecial(query.HexadecimalCode);
    
        const paints: Array<Paint> = await this.useCase.Execute(color);
    
        const dtos = paints.map(paint => new PaintDto(paint));
        return new PaintsByColor(dtos);
    }

}