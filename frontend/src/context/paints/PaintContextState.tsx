import React from 'react';
import { paintReducer } from "./PaintContextReducer";
import PaintContext from './PaintContext';
import { Paint } from '../../models/Paint';
import SearchPaintsByName from './services/SearchPaintsByName';
import GetAllPaints from './services/GetAllPaints';
import SearchPaintsByColor from './services/SearchPaintsByColor';

export interface PaintState {
    paints: Paint[];
    fetchingData: boolean;
    lastRequestOk: boolean;
}

const PaintContextState = (props: any) => {
    const [state, dispatch] = React.useReducer(paintReducer, {
        fetchingData: false,
        paints: [],
        lastRequestOk: true
    });

    return (
        <PaintContext.Provider
            value={{
                State: state,
                GetAllPaints: GetAllPaints(dispatch),
                SearchPaintsByName: SearchPaintsByName(dispatch),
                SearchPaintsByColor: SearchPaintsByColor(dispatch)
            }}
        >
            {props.children}
        </PaintContext.Provider>
    );

}

export default PaintContextState