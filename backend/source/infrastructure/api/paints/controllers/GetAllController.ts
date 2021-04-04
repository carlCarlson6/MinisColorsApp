import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { AllPaints } from "../../../../app/getAllPaints/AllPaints";
import { GetAllPaintsQuery } from "../../../../app/getAllPaints/GetAllPaintsQuery";
import { ServiceBus } from "../../../../core/services/ServiceBus";

@injectable()
export class GetAllController {
    private readonly serviceBus: ServiceBus;

    constructor(@inject('ServiceBus') serviceBus: ServiceBus) {
        this.serviceBus = serviceBus;
    }
    
    public async GetAll(request: Request, response: Response): Promise<Response<any>> {
        const query: GetAllPaintsQuery = new GetAllPaintsQuery();

        const allPaints: AllPaints = await this.serviceBus.Dispatch<GetAllPaintsQuery, AllPaints>(query);

        return response.status(200).send(allPaints.AlllPaints);
    }

} 