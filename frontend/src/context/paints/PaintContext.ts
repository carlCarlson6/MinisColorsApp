import React from 'react';
import { PaintState } from './PaintContextState';

type PaintContextProviderValue = { 
    State: PaintState, 
    SearchPaintByName: (paintName: string) => Promise<void> 
};

const PaintContext = React.createContext<PaintContextProviderValue>({} as PaintContextProviderValue);

export default PaintContext;