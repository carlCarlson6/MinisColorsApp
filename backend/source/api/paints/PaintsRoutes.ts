import { Request, Response, Router } from "express";
import DI from "../dependencyInjection/Container";
import { GetAllController } from "./controllers/GetAllController";
import { GetByColorController } from "./controllers/GetByColorController";
import { GetByNearestColorController } from "./controllers/GetByNearestColor";
import { GetController } from "./controllers/GetController";

export class PaintsRoutes {
    public router = Router();
    public path: string = '/api/paints';

    private getController: GetController = DI.get<GetController>('GetController');
    private getAllController: GetAllController = DI.get<GetAllController>('GetAllController');
    private getByColorController: GetByColorController = DI.get<GetByColorController>('GetByColorController');
    private getByNearestColor: GetByNearestColorController = DI.get<GetByNearestColorController>('GetByNearestColorController');

    private Get = (request: Request, response: Response) => this.getController.Get(request, response);
    private GetAll = (request: Request, response: Response) => this.getAllController.GetAll(request, response);
    private GetByColor = (request: Request, response: Response) => this.getByColorController.GetByColor(request, response);
    private GetByNearestColor = (request: Request, response: Response) => this.getByNearestColor.GetByNearestColor(request, response);

    constructor() {
        this.DeclareRoutes();
    }

    private DeclareRoutes(): void {
        this.router.get('/:paintName', this.Get);
        this.router.get('/', this.GetAll);
        this.router.get('/color/:hexCode', this.GetByColor);
        this.router.get('/color/:hexCode/nearest', this.GetByNearestColor);
    }

}