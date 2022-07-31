import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ServiceBus } from "../../bus/ServiceBus";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";
import { AllEquivalentPaints } from "../allEquivalentPaints/AllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "../allEquivalentPaints/GetAllEquivalentPaintsQuery";

@injectable()
export class GetController {
    constructor(
        @inject(InjectionTypes.ServiceBus)
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