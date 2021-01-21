import React, { Fragment } from 'react';
import { paintInitialState } from './PaintInitialState';
import { paintReducer } from "./PaintContextReducer";
import { PaintService } from '../../services/PaintServcive';
import PaintContext from './PaintContext';

const PaintContextState = (props: any) => {
    const [state, dispatch] = React.useReducer(paintReducer, paintInitialState)

    console.log('You are running this application in mode', process.env.NODE_ENV);
    console.log('reading env vars');
    console.log(process.env.REACT_APP_ASD);

    const backendURL = process.env.REACT_APP_ASD as string
    const paintService = new PaintService(dispatch, backendURL);

    return (
        <PaintContext.Provider
            value={{
                State: state,
                PaintServices: paintService
            }}
        >
            {props.children}
        </PaintContext.Provider>
    );

}

export default PaintContextState