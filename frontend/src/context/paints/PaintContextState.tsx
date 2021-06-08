import React from 'react';
import { paintInitialState } from './PaintInitialState';
import { paintReducer } from "./PaintContextReducer";
import { PaintsSearchService } from '../../services/PaintsSearchService';
import PaintContext from './PaintContext';

const PaintContextState = (props: any) => {
    const [state, dispatch] = React.useReducer(paintReducer, paintInitialState);

    const backendURL = process.env.REACT_APP_ASD as string;
    const paintsSearchService = new PaintsSearchService(dispatch, backendURL);

    return (
        <PaintContext.Provider
            value={{
                State: state,
                PaintsSearchService: paintsSearchService
            }}
        >
            {props.children}
        </PaintContext.Provider>
    );

}

export default PaintContextState