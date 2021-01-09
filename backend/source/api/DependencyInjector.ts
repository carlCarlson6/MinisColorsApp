import { Container } from "inversify";
import { ColorsController } from "./controllers/ColorsController";

export enum InjectionTypes {
    ColorsController = 'ColorsController'
}

const container: Container = new Container();
container.bind<ColorsController>('ColorsController').to(ColorsController);

export default container;