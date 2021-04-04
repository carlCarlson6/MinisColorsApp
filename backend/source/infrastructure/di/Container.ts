import { Container } from "inversify";
import { injectApplications } from "./InjectApplication";
import { injectControllers } from "./InjectControllers";
import { injectServices } from "./InjectServices";

let container: Container = new Container();

container = injectControllers(container);
container = injectApplications(container);
container = injectServices(container);

export default container;