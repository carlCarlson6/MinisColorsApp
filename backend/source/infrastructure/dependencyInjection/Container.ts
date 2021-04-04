import { Container } from "inversify";
import { injectApplications } from "./InjectApplication";
import { injectControllers } from "./InjectControllers";
import { injectServices } from "./InjectServices";

const container: Container = new Container();

injectControllers(container);
injectApplications(container);
injectServices(container);

export default container;