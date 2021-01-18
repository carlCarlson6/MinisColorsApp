import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { GetAllPaints } from "../../../app/GetAllPaints";
import { Paint } from "../../../core/entities/Paint";
import { PaintDto } from "../messages/PaintDto";

@injectable()
export class GetAllController {
    private getAll: GetAllPaints;

    constructor(@inject('GetAllPaints') getAllPaints: GetAllPaints) {
        this.getAll = getAllPaints;
    }
    
    public async GetAll(request: Request, response: Response): Promise<Response<any>> {
        const paints: Array<Paint> = await this.getAll.Execute();
        
        const allPaintsResponse: Array<PaintDto> = paints.map(paint => ({ Company: paint.Company, Name: paint.Name, HexColorCode: paint.Color.HexadecimalCode.Value })) 
        response.status(200).send(allPaintsResponse);
        return response;
    }

} 