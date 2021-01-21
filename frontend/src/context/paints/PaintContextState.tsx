import React, { Fragment } from 'react';
import { paintInitialState } from './PaintInitialState';
import { paintReducer } from "./PaintContextReducer";
import { PaintService } from '../../services/PaintServcive';
import PaintContext from './PaintContext';

const PaintContextState = (props: any) => {
    const [state, dispatch] = React.useReducer(paintReducer, paintInitialState)

    const paintService = new PaintService(dispatch, '<to add>');

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