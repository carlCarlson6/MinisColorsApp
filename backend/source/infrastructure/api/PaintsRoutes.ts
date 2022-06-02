import { Request, Response, Router } from "express";
import { GetAllController } from "../../paints/allEquivalentPaints/GetAllController";
import { GetController } from "../../paints/allPaints/GetController";
import { GetByNearestColorController } from "../../paints/nearestPaint/GetByNearestColorController";
import { GetByColorController } from "../../paints/paintsByColor/GetByColorController";
import DI from "../di/ContainerDI";
import { InjectionTypes } from "../di/InjectionTypes";

export class PaintsRoutes {
    public router = Router();
    public path: string = '/api/paints';

    private getController = DI.get<GetController>(InjectionTypes.GetController);
    private getAllController = DI.get<GetAllController>(InjectionTypes.GetAllController);
    private getByColorController = DI.get<GetByColorController>(InjectionTypes.GetByColorController);
    private getByNearestColor = DI.get<GetByNearestColorController>(InjectionTypes.GetByNearestColorController);
    
    private Get = (request: Request, response: Response) => this.getController.Get(request, response);
    private GetAll = (request: Request, response: Response) => this.getAllController.GetAll(request, response);
    private GetByColor = (request: Request, response: Response) => this.getByColorController.GetByColor(request, response);
    private GetByNearestColor = (request: Request, response: Response) => this.getByNearestColor.GetByNearestColor(request, response);

    constructor() {
        this.router.get('/:paintName', this.Get);
        this.router.get('/', this.GetAll);
        this.router.get('/color/:hexCode', this.GetByColor);
        this.router.get('/color/:hexCode/nearest', this.GetByNearestColor);
    }
}