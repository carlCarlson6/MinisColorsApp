import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { GetNearestPaintByColor } from "../../../app/GetNearestPaintByColor";
import { Color } from "../../../core/entities/Color";
import { Paint } from "../../../core/entities/Paint";
import { ColorFactory } from "../../../core/services/ColorFactory";

@injectable()
export class GetByNearestColorController {
    private getNearest: GetNearestPaintByColor;
    private factory: ColorFactory;

    constructor(@inject('GetNearestPaintByColor') getNearestPaintByColor: GetNearestPaintByColor) {
        this.getNearest = getNearestPaintByColor;
        this.factory = new ColorFactory();
    }

    public async GetByNearestColor(request: Request, response: Response): Promise<Response<any>> {
        const hexCode: String = request.params.hexCode;
        const color: Color = this.factory.BuildFromHexadecial(hexCode);

        const paints: Array<Paint> = await this.getNearest.Execute(color);

        response.status(200).send(paints);
        return response;
    }
    
} 