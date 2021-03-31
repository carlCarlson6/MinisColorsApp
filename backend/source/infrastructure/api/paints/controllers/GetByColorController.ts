import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { GetPaintsByColor } from "../../../../app/getPaintsByColor/GetPaintsByColor";
import { Color } from "../../../../core/entities/Color";
import { Paint } from "../../../../core/entities/Paint";
import { ColorFactory } from "../../../../core/services/ColorFactory";

@injectable()
export class GetByColorController {
    private getPaintsByColor: GetPaintsByColor;
    private factory: ColorFactory;

    constructor(@inject('GetPaintsByColor') getPaintsByColor: GetPaintsByColor) {
        this.getPaintsByColor = getPaintsByColor;
        this.factory = new ColorFactory();
    }

    public async GetByColor(request: Request, response: Response): Promise<Response<any>> {
        const hexCode: string = request.params.hexCode;
        const color: Color = this.factory.BuildFromHexadecial(hexCode);
        
        const paints: Array<Paint> = await this.getPaintsByColor.Execute(color);
        //const paintsResponse: Array<PaintDto> = paints.map(paint => ({ Company: paint.Company, Name: paint.Name, HexColorCode: paint.Color.HexadecimalCode.Value })) 
        //response.status(200).send(paintsResponse);
        //return response;
        throw new Error('not implemented')
    }
    
} 