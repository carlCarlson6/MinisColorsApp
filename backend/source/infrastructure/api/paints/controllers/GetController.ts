import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { GetAllEquivalentPaintsQuery } from "../../../../app/getAllEquivalentPaints/GetAllEquivalentPaintsQuery";
import { ServiceBus } from "../../../../core/services/bus/ServiceBus";
import { AllEquivalentPaints } from "../../../../app/getAllEquivalentPaints/AllEquivalentPaints";

@injectable()
export class GetController {
    constructor(
        @inject('ServiceBus')
        private readonly serviceBus: ServiceBus
    ) { }

    public async Get(request: Request, response: Response): Promise<Response<any>> {
        const paintName = request.params.paintName;
        const query = new GetAllEquivalentPaintsQuery(paintName);

        try {
            const equivalentPaints = await this.serviceBus.Dispatch<GetAllEquivalentPaintsQuery, AllEquivalentPaints>(query);        
            return response.status(200).send(equivalentPaints.EquivalentPaints);
        } 
        catch(e) {
            const error = e as Error;
            console.error(error.message);
            return response.status(500).send(error.message);
        }
    }   
}