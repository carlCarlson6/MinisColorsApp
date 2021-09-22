export enum InjectionTypes {
    GetAllController = 'GetAllController',
    GetByColorController = 'GetByColorController',
    GetByNearestColorController = 'GetByNearestColorController',
    GetController = 'GetController',

    GetAllEquivalentPaints = 'GetAllEquivalentPaints',
    GetAllEquivalentPaintsQueryHandler = 'GetAllEquivalentPaintsQueryHandler',
    GetAllEquivalentPaintsQuery = "GetAllEquivalentPaintsQuery",

    GetAllPaints = 'GetAllPaints',
    GetAllPaintsQueryHandler = 'GetAllPaintsQueryHandler',
    GetAllPaintsQuery = "GetAllPaintsQuery",

    GetNearestPaintsByColor = 'GetNearestPaintsByColor',
    GetNearestPaintsByColorQueryHandler = 'GetNearestPaintsByColorQueryHandler',
    GetNearestPaintsByColorQuery = 'GetNearestPaintsByColorQuery',

    GetPaintsByColor = 'GetPaintsByColor',
    GetPaintsByColorQueryHandler = 'GetPaintsByColorQueryHandler',
    GetPaintsByColorQuery = 'GetPaintsByColorQuery',

    ServiceBus = 'ServiceBus',

    ColorsRepository = 'ColorsRepository',
    PaintsRepository = 'PaintsRepository',

    NearestColorFinder = 'NearestColorFinder'
}
