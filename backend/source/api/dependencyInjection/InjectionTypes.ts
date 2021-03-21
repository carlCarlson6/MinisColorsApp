export enum InjectionTypes {
    GetAllController = 'GetAllController',
    GetByColorController = 'GetByColorController',
    GetByNearestColorController = 'GetByNearestColorController',
    GetController = 'GetController',
    
    GetAllEquivalentPaints = 'GetAllEquivalentPaints',
    GetAllPaints = 'GetAllPaints',
    GetNearestPaintByColor = 'GetNearestPaintByColor',
    GetPaintsByColor = 'GetPaintsByColor',

    IColorsRepository = 'IColorsRepository',
    IPaintsRepository = 'IPaintsRepository',

    NearestColorFinder = 'NearestColorFinder'
}