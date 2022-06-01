import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ServiceBus } from "../core/services/bus/ServiceBus";
import { InjectionTypes } from "../infrastructure/di/InjectionTypes";
import { GetPaintsByColorQuery } from "./GetPaintsByColorQuery";
import { PaintsByColor } from "./PaintsByColor";

@injectable()
export class GetByColorController {
    constructor(
        @inject(InjectionTypes.ServiceBus) 
        private readonly serviceBus: ServiceBus
    ) { }

    public async GetByColor(request: Request, response: Response): Promise<Response<any>> {
        const query = new GetPaintsByColorQuery(request.params.hexCode);

        try {
            const paintsByColor = await this.serviceBus.Dispatch<GetPaintsByColorQuery, PaintsByColor>(query);
            return response.status(200).send(paintsByColor.Paints);
        }
        catch(e) {
            const error = e as Error;
            console.error(error);
            return response.status(500).send(error.message);
        }
    }
}