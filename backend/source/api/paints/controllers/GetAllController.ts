import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { GetAllPaints } from "../../../app/GetAllPaints";
import { Paint } from "../../../core/entities/Paint";

@injectable()
export class GetAllController {
    private getAll: GetAllPaints;

    constructor(@inject('GetAllPaints') getAllPaints: GetAllPaints) {
        this.getAll = getAllPaints;
    }
    
    public async GetAll(request: Request, response: Response): Promise<Response<any>> {
        const paints: Array<Paint> = await this.getAll.Execute();
        response.status(200).send(paints);
        return response;
    }

} 