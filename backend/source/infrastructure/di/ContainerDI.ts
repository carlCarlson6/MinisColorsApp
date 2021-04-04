import { Container } from "inversify";
import { injectApplications } from "./injections/InjectApplication";
import { injectControllers } from "./injections/InjectControllers";
import { injectServices } from "./injections/InjectServices";

let container: Container = new Container();

container = injectServices(container);
container = injectApplications(container);
container = injectControllers(container);

export default container;