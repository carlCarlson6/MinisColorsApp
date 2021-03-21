import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { GetNearestPaintByColor } from "../../../app/GetNearestPaintByColor";
import { Color } from "../../../core/entities/Color";
import { Paint } from "../../../core/entities/Paint";
import { ColorFactory } from "../../../core/services/ColorFactory";
import { PaintDto } from "../messages/PaintDto";

@injectable()
export class GetByNearestColorController {
    private getNearest: GetNearestPaintByColor;
    private factory: ColorFactory;

    constructor(@inject('GetNearestPaintByColor') getNearestPaintByColor: GetNearestPaintByColor) {
        this.getNearest = getNearestPaintByColor;
        this.factory = new ColorFactory();
    }

    public async GetByNearestColor(request: Request, response: Response): Promise<Response<any>> {
        const hexCode: string = request.params.hexCode;
        const color: Color = this.factory.BuildFromHexadecial(hexCode);

        const paints: Array<Paint> = await this.getNearest.Execute(color);
        
        const paintsResponse: Array<PaintDto> = paints.map(paint => ({ Company: paint.Company, Name: paint.Name, HexColorCode: paint.Color.HexadecimalCode.Value })) 
        response.status(200).send(paintsResponse);
        return response;
    }
    
} 