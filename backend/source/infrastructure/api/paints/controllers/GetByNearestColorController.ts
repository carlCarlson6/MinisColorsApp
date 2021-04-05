import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ServiceBus } from "../../../../core/services/ServiceBus";
import { GetNearestPaintsByColorQuery } from "../../../../app/getNearestPaint/GetNearestPaintsByColorQuery";
import { NearestPaintsByColor } from "../../../../app/getNearestPaint/NearestPaintsByColor";

@injectable()
export class GetByNearestColorController {
    private readonly serviceBus: ServiceBus;

    constructor(@inject('ServiceBus') serviceBus: ServiceBus) {
        this.serviceBus = serviceBus;
    }

    public async GetByNearestColor(request: Request, response: Response): Promise<Response<any>> {
        const hexCode: string = request.params.hexCode;
        const query: GetNearestPaintsByColorQuery = new GetNearestPaintsByColorQuery(hexCode); 

        try {
            const nearestPaints: NearestPaintsByColor = await this.serviceBus.Dispatch<GetNearestPaintsByColorQuery, NearestPaintsByColor>(query);
        
            return response.status(200).send(nearestPaints);
        }
        catch(error) {
            return response.status(500).send(error.message);
        }
    }
    
} 