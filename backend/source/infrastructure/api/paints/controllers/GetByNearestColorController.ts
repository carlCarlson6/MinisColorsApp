import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ServiceBus } from "../../../../core/services/bus/ServiceBus";
import { GetNearestPaintsByColorQuery } from "../../../../app/getNearestPaint/GetNearestPaintsByColorQuery";
import { NearestPaintsByColor } from "../../../../app/getNearestPaint/NearestPaintsByColor";

@injectable()
export class GetByNearestColorController {
    constructor(
        @inject('ServiceBus')
        private readonly serviceBus: ServiceBus
    ) { }

    public async GetByNearestColor(request: Request, response: Response): Promise<Response<any>> {
        const hexCode = request.params.hexCode;
        const query = new GetNearestPaintsByColorQuery(hexCode); 

        try {
            const nearestPaints: NearestPaintsByColor = await this.serviceBus.Dispatch<GetNearestPaintsByColorQuery, NearestPaintsByColor>(query);
            return response.status(200).send(nearestPaints);
        }
        catch(e) {
            const error = e as Error;
            return response.status(500).send(error.message);
        }
    }
}