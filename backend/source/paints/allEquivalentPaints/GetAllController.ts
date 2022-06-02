import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { ServiceBus } from "../../bus/ServiceBus";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";
import { AllPaints } from "../allPaints/AllPaints";
import { GetAllPaintsQuery } from "../allPaints/GetAllPaintsQuery";

@injectable()
export class GetAllController {
    constructor(
        @inject(InjectionTypes.ServiceBus) 
        private readonly serviceBus: ServiceBus
    ) { }
    
    public async GetAll(request: Request, response: Response): Promise<Response<any>> {
        const query = new GetAllPaintsQuery();

        try {
            const allPaints = await this.serviceBus.Dispatch<GetAllPaintsQuery, AllPaints>(query);
            return response.status(200).send(allPaints.AlllPaints);
        }
        catch(e) {
            const error = e as Error
            return response.status(500).send(error.message);
        }
    }
}
