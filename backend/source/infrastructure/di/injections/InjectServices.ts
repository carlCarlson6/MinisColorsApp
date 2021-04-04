import { Container } from "inversify";
import { AllEquivalentPaints } from "../../../app/getAllEquivalentPaints/AllEquivalentPaints";
import { GetAllEquivalentPaints } from "../../../app/getAllEquivalentPaints/GetAllEquivalentPaints";
import { GetAllEquivalentPaintsQuery } from "../../../app/getAllEquivalentPaints/GetAllEquivalentPaintsQuery";
import { GetAllEquivalentPaintsQueryHandler } from "../../../app/getAllEquivalentPaints/GetAllEquivalentPaintsQueryHandler";
import { AllPaints } from "../../../app/getAllPaints/AllPaints";
import { GetAllPaints } from "../../../app/getAllPaints/GetAllPaints";
import { GetAllPaintsQuery } from "../../../app/getAllPaints/GetAllPaintsQuery";
import { GetAllPaintsQueryHandler } from "../../../app/getAllPaints/GetAllPaintsQueryHandler";
import { GetNearestPaintsByColor } from "../../../app/getNearestPaint/GetNearestPaintsByColor";
import { GetNearestPaintsByColorQuery } from "../../../app/getNearestPaint/GetNearestPaintsByColorQuery";
import { GetNearestPaintsByColorQueryHandler } from "../../../app/getNearestPaint/GetNearestPaintsByColorQueryHandler";
import { NearestPaintsByColor } from "../../../app/getNearestPaint/NearestPaintsByColor";
import { GetPaintsByColor } from "../../../app/getPaintsByColor/GetPaintsByColor";
import { GetPaintsByColorQuery } from "../../../app/getPaintsByColor/GetPaintsByColorQuery";
import { GetPaintsByColorQueryHandler } from "../../../app/getPaintsByColor/GetPaintsByColorQueryHandler";
import { PaintsByColor } from "../../../app/getPaintsByColor/PaintsByColor";
import { ColorsRepository } from "../../../core/services/ColorsRepository";
import { Handler } from "../../../core/services/Handler";
import { NearestColorFinder } from "../../../core/services/NearestColorFinder";
import { PaintsRepository } from "../../../core/services/PaintsRepository";
import { ServiceBus } from "../../../core/services/ServiceBus";
import { InMemoryServiceBus } from "../../inMemoryServiceBus/InMemoryServiceBus";
import { ColorsMongoRepository } from "../../mongoRepositories/ColorsMongoRepository";
import { PaintsMongoRepository } from "../../mongoRepositories/PaintsMongoRepository";
import { InjectionTypes } from "../InjectionTypes";

export const injectServices = (container: Container): Container => {
    container.bind<ColorsRepository>(InjectionTypes.ColorsRepository).to(ColorsMongoRepository);
    container.bind<PaintsRepository>(InjectionTypes.PaintsRepository).to(PaintsMongoRepository);

    container.bind<NearestColorFinder>(InjectionTypes.NearestColorFinder).to(NearestColorFinder);
    
    container = injectApplications(container);

    container = injectHandlers(container);
    container = registerHandlers(container);

    return container;
}

const injectApplications = (container: Container): Container => {
    container.bind<GetAllEquivalentPaints>(InjectionTypes.GetAllEquivalentPaints).to(GetAllEquivalentPaints);
    container.bind<GetAllPaints>(InjectionTypes.GetAllPaints).to(GetAllPaints);
    container.bind<GetNearestPaintsByColor>(InjectionTypes.GetNearestPaintsByColor).to(GetNearestPaintsByColor);
    container.bind<GetPaintsByColor>(InjectionTypes.GetPaintsByColor).to(GetPaintsByColor);

    return container;
}

const injectHandlers = (container: Container): Container => {
    container.bind<Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints>>(InjectionTypes.GetAllEquivalentPaintsQueryHandler).to(GetAllEquivalentPaintsQueryHandler);
    container.bind<Handler<GetAllPaintsQuery, AllPaints>>(InjectionTypes.GetAllPaintsQueryHandler).to(GetAllPaintsQueryHandler);
    container.bind<Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor>>(InjectionTypes.GetNearestPaintsByColorQueryHandler).to(GetNearestPaintsByColorQueryHandler);
    container.bind<Handler<GetPaintsByColorQuery, PaintsByColor>>(InjectionTypes.GetPaintsByColorQueryHandler).to(GetPaintsByColorQueryHandler);

    return container;
}

const registerHandlers = (container: Container): Container => {
    const inMemoryServiceBus = new InMemoryServiceBus();
    
    const getAllEquivalentPaintsQueryHandler: Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints> = container.get<Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints>>(InjectionTypes.GetAllEquivalentPaintsQueryHandler);
    inMemoryServiceBus.Register(getAllEquivalentPaintsQueryHandler, "GetAllEquivalentPaintsQuery");

    const getAllPaintsQueryHandler: Handler<GetAllPaintsQuery, AllPaints> = container.get<Handler<GetAllPaintsQuery, AllPaints>>(InjectionTypes.GetAllPaintsQueryHandler);
    inMemoryServiceBus.Register(getAllPaintsQueryHandler, "GetAllPaintsQuery");

    const getNearestPaintQueryHandler: Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor> = container.get<Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor>>(InjectionTypes.GetNearestPaintsByColorQueryHandler);
    inMemoryServiceBus.Register(getNearestPaintQueryHandler, "GetNearestPaintsByColorQueryHandler");

    const getPaintsByColorQueryHandler: Handler<GetPaintsByColorQuery, PaintsByColor> = container.get<Handler<GetPaintsByColorQuery, PaintsByColor>>(InjectionTypes.GetPaintsByColorQueryHandler);
    inMemoryServiceBus.Register(getPaintsByColorQueryHandler, "GetPaintsByColorQuery");

    container.bind<ServiceBus>(InjectionTypes.ServiceBus).toConstantValue(inMemoryServiceBus);

    return container;
}