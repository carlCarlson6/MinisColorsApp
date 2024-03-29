import { Container } from "inversify";
import { injectApplications } from "./injections/InjectApplication";
import { injectControllers } from "./injections/InjectControllers";
import { injectHandlers } from "./injections/InjectHandlers";
import { injectServices } from "./injections/InjectServices";

const bootstrapContainerDI = () => {
    let container: Container = new Container();

    container = injectServices(container);
    container = injectApplications(container);
    container = injectHandlers(container);
    container = injectControllers(container);

    return container;
};

export default bootstrapContainerDI();
