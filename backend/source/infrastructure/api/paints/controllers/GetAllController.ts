import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { AllPaints } from "../../../../app/getAllPaints/AllPaints";
import { GetAllPaintsQuery } from "../../../../app/getAllPaints/GetAllPaintsQuery";
import { ServiceBus } from "../../../../core/services/bus/ServiceBus";

@injectable()
export class GetAllController {
    constructor(
        @inject('ServiceBus') 
        private readonly serviceBus: ServiceBus
    ) { }
    
    public async GetAll(request: Request, response: Response): Promise<Response<any>> {
        const query: GetAllPaintsQuery = new GetAllPaintsQuery();

        try {
            const allPaints: AllPaints = await this.serviceBus.Dispatch<GetAllPaintsQuery, AllPaints>(query);
            return response.status(200).send(allPaints.AlllPaints);
        }
        catch(e) {
            const error = e as Error
            return response.status(500).send(error.message);
        }
    }
}
