import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { GetAllEquivalentPaintsQuery } from "../../../../app/getAllEquivalentPaints/GetAllEquivalentPaintsQuery";
import { ServiceBus } from "../../../../core/services/ServiceBus";
import { AllEquivalentPaints } from "../../../../app/getAllEquivalentPaints/AllEquivalentPaints";

@injectable()
export class GetController {
    private serviceBus: ServiceBus;

    constructor(@inject('ServiceBus') serviceBus: ServiceBus) {
        this.serviceBus = serviceBus
    }

    public async Get(request: Request, response: Response): Promise<Response<any>> {
        const paintName: string = request.params.paintName;
        const query = new GetAllEquivalentPaintsQuery(paintName);

        try {
            const equivalentPaints: AllEquivalentPaints = await this.serviceBus.Dispatch<GetAllEquivalentPaintsQuery, AllEquivalentPaints>(query);        
            return response.status(200).send(equivalentPaints.EquivalentPaints);
        } 
        catch(e) {
            const error = e as Error;
            return response.status(500).send(error.message);
        }
    }
    
}
