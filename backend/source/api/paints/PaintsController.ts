import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class PaintsController {

    constructor() { }

    async GetAll(request: Request, response: Response): Promise<Response<any>> {
        throw new Error();
    }

    async Get(request: Request, response: Response): Promise<Response<any>> {
        throw new Error();
    }


}