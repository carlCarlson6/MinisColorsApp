export enum InjectionTypes {
    GetAllController = 'GetAllController',
    GetByColorController = 'GetByColorController',
    GetByNearestColorController = 'GetByNearestColorController',
    GetController = 'GetController',

    GetAllEquivalentPaints = 'GetAllEquivalentPaints',
    GetAllEquivalentPaintsQueryHandler = 'GetAllEquivalentPaintsQueryHandler',

    GetAllPaints = 'GetAllPaints',
    GetAllPaintsQueryHandler = 'GetAllPaintsQueryHandler',

    GetNearestPaintsByColor = 'GetNearestPaintsByColor',
    GetNearestPaintsByColorQueryHandler = 'GetNearestPaintsByColorQueryHandler',

    GetPaintsByColor = 'GetPaintsByColor',
    GetPaintsByColorQueryHandler = 'GetPaintsByColorQueryHandler',

    ServiceBus = 'ServiceBus',

    ColorsRepository = 'ColorsRepository',
    PaintsRepository = 'PaintsRepository',

    NearestColorFinder = 'NearestColorFinder'
}
