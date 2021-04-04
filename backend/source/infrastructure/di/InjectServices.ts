import { Container } from "inversify";
import { ColorsRepository } from "../../core/services/ColorsRepository";
import { NearestColorFinder } from "../../core/services/NearestColorFinder";
import { PaintsRepository } from "../../core/services/PaintsRepository";
import { ServiceBus } from "../../core/services/ServiceBus";
import { InMemoryServiceBus } from "../inMemoryServiceBus/InMemoryServiceBus";
import { ColorsMongoRepository } from "../mongoRepositories/ColorsMongoRepository";
import { PaintsMongoRepository } from "../mongoRepositories/PaintsMongoRepository";
import { Handler } from "../../core/services/Handler";
import { GetAllEquivalentPaintsQuery } from "../../app/getAllEquivalentPaints/GetAllEquivalentPaintsQuery";
import { AllEquivalentPaints } from "../../app/getAllEquivalentPaints/AllEquivalentPaints";
import { GetAllPaintsQuery } from "../../app/getAllPaints/GetAllPaintsQuery";
import { AllPaints } from "../../app/getAllPaints/AllPaints";
import { GetNearestPaintsByColorQuery } from "../../app/getNearestPaint/GetNearestPaintsByColorQuery";
import { NearestPaintsByColor } from "../../app/getNearestPaint/NearestPaintsByColor";
import { GetPaintsByColorQuery } from "../../app/getPaintsByColor/GetPaintsByColorQuery";
import { PaintsByColor } from "../../app/getPaintsByColor/PaintsByColor";
import { InjectionTypes } from "./InjectionTypes";

export const injectServices = (container: Container): Container => {
    container = registerHandlers(container);

    container.bind<ColorsRepository>(InjectionTypes.ColorsRepository).to(ColorsMongoRepository);
    container.bind<PaintsRepository>(InjectionTypes.PaintsRepository).to(PaintsMongoRepository);

    container.bind<NearestColorFinder>(InjectionTypes.NearestColorFinder).to(NearestColorFinder);
    
    return container;
}

const registerHandlers = (container: Container): Container => {
    const inMemoryServiceBus = new InMemoryServiceBus();
    
    const getAllEquivalentPaintsQueryHandler: Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints> = container.get<Handler<GetAllEquivalentPaintsQuery, AllEquivalentPaints>>(InjectionTypes.GetAllEquivalentPaintsQueryHandler);
    inMemoryServiceBus.Register(getAllEquivalentPaintsQueryHandler, InjectionTypes.GetAllEquivalentPaintsQueryHandler);

    const getAllPaintsQueryHandler: Handler<GetAllPaintsQuery, AllPaints> = container.get<Handler<GetAllPaintsQuery, AllPaints>>(InjectionTypes.GetAllPaintsQueryHandler);
    inMemoryServiceBus.Register(getAllPaintsQueryHandler, InjectionTypes.GetAllPaintsQueryHandler);

    const getNearestPaintQueryHandler: Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor> = container.get<Handler<GetNearestPaintsByColorQuery, NearestPaintsByColor>>(InjectionTypes.GetNearestPaintsByColorQueryHandler);
    inMemoryServiceBus.Register(getNearestPaintQueryHandler, InjectionTypes.GetNearestPaintsByColorQueryHandler);

    const getPaintsByColorQueryHandler: Handler<GetPaintsByColorQuery, PaintsByColor> = container.get<Handler<GetPaintsByColorQuery, PaintsByColor>>(InjectionTypes.GetPaintsByColorQueryHandler);
    inMemoryServiceBus.Register(getPaintsByColorQueryHandler, InjectionTypes.GetPaintsByColorQueryHandler);

    container.bind<ServiceBus>(InjectionTypes.ServiceBus).toConstantValue(inMemoryServiceBus);

    return container;
}