import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { GetAllEquivalentPaints } from "../../../app/GetAllEquivalentPaints";
import { Paint } from "../../../core/entities/Paint";
import { PaintDto } from "../messages/PaintDto";

@injectable()
export class GetController {
    private get: GetAllEquivalentPaints;

    constructor(@inject('GetAllEquivalentPaints') getAllEquivalentPaints: GetAllEquivalentPaints) {
        this.get = getAllEquivalentPaints;
    }

    public async Get(request: Request, response: Response): Promise<Response<any>> {
        const paintName: String = request.params.paintName;
        const paints: Array<Paint> = await this.get.Execute(paintName);

        if(paints == []) {
            response.status(200).send([]);
            return response;
        }

        const paintsResponse: Array<PaintDto> = paints.map(paint => ({ Company: paint.Company, Name: paint.Name, HexColorCode: paint.Color.HexadecimalCode.Value })) 
        response.status(200).send(paintsResponse);
        return response;
    }
    
} 