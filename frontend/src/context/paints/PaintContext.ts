import React from 'react';
import { PaintState } from './PaintContextState';

type PaintContextProviderValue = { 
    State: PaintState,
    GetAllPaints: () => Promise<void>,
    SearchPaintsByName: (paintName: string) => Promise<void>,
    SearchPaintsByColor: (paintColor: string) => Promise<void>
};

const PaintContext = React.createContext<PaintContextProviderValue>({} as PaintContextProviderValue);

export default PaintContext;