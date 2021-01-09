import { Request, Response, Router } from "express";
import { ColorsController } from "../controllers/ColorsController";
import DI from "../DependencyInjector";

export class ColorsRoutes {
    public router = Router()
    public path = 'api/colors'

    private controller: ColorsController = DI.get<ColorsController>('NewsController')

    private Get = (request: Request, response: Response) => this.controller.Get(request, response);
    private GetAll = (request: Request, response: Response) => this.controller.GetAll(request, response);

    constructor() {
        this.DeclareRoutes();
    }

    private DeclareRoutes(): void {
        this.router.get('/:color', this.Get);
        this.router.get('', this.GetAll);
    }

}