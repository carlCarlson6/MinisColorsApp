import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { GetPaintsByColorQuery } from "../../../../app/getPaintsByColor/GetPaintsByColorQuery";
import { PaintsByColor } from "../../../../app/getPaintsByColor/PaintsByColor";
import { ServiceBus } from "../../../../core/services/ServiceBus";

@injectable()
export class GetByColorController {
    private readonly serviceBus: ServiceBus;

    constructor(@inject('ServiceBus') serviceBus: ServiceBus) {
        this.serviceBus = serviceBus;
    }

    public async GetByColor(request: Request, response: Response): Promise<Response<any>> {
        const hexCode: string = request.params.hexCode;
        const query = new GetPaintsByColorQuery(hexCode);

        try {
            const paintsByColor: PaintsByColor = await this.serviceBus.Dispatch<GetPaintsByColorQuery, PaintsByColor>(query);
            return response.status(200).send(paintsByColor.Paints);
        }
        catch(error) {
            return response.status(500).send(error.message);
        }
    }
    
} 