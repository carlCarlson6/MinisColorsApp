import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ServiceBus } from "../core/services/bus/ServiceBus";
import { InjectionTypes } from "../infrastructure/di/InjectionTypes";
import { GetNearestPaintsByColorQuery } from "./GetNearestPaintsByColorQuery";
import { NearestPaintsByColor } from "./NearestPaintsByColor";

@injectable()
export class GetByNearestColorController {
    constructor(
        @inject(InjectionTypes.ServiceBus)
        private readonly serviceBus: ServiceBus
    ) { }

    public async GetByNearestColor(request: Request, response: Response): Promise<Response<any>> {
        const hexCode = request.params.hexCode;
        const query = new GetNearestPaintsByColorQuery(hexCode); 

        try {
            const nearestPaints = await this.serviceBus.Dispatch<GetNearestPaintsByColorQuery, NearestPaintsByColor>(query);
            return response.status(200).send(nearestPaints.NearestPaints);
        }
        catch(e) {
            const error = e as Error;
            return response.status(500).send(error.message);
        }
    }
}