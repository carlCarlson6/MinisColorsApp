import { Container } from "inversify";
import { injectControllers } from "./injections/InjectControllers";
import { injectServices } from "./injections/InjectServices";

const bootstrapContainerDI = () => {
    let container: Container = new Container();

    container = injectServices(container);
    container = injectControllers(container);

    return container;
};

export default bootstrapContainerDI();