import { Container } from "inversify";
import { PaintsController } from "./paints/PaintsController";

export enum InjectionTypes {
    PaintsController = 'PaintsController'
}

const container: Container = new Container();
container.bind<PaintsController>(InjectionTypes.PaintsController).to(PaintsController);

export default container;