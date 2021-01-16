import { Request, Response } from "express";
import { injectable } from "inversify";
import { GetAllEquivalentPaints } from "../../../app/GetAllEquivalentPaints";
import { Paint } from "../../../core/entities/Paint";

@injectable()
export class GetController {
    private get: GetAllEquivalentPaints;

    constructor(getAllEquivalentPaints: GetAllEquivalentPaints) {
        this.get = getAllEquivalentPaints;
    }

    public async Get(request: Request, response: Response): Promise<Response<any>> {
        const paintName: String = request.params.paintName;
        const paints: Array<Paint> = await this.get.Execute(paintName);

        response.status(200).send(paints);
        return response;
    }
    
} 