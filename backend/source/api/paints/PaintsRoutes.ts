import { Request, Response, Router } from "express";
import { PaintsController } from "./PaintsController";
import DI from "../DependencyInjector";

export class PaintsRoutes {
    public router = Router()
    public path = 'api/paint'

    private controller: PaintsController = DI.get<PaintsController>('NewsController')

    private Get = (request: Request, response: Response) => this.controller.Get(request, response);
    private GetAll = (request: Request, response: Response) => this.controller.GetAll(request, response);

    constructor() {
        this.DeclareRoutes();
    }

    private DeclareRoutes(): void {
        this.router.get('/:paint', this.Get);
        this.router.get('', this.GetAll);
    }

}