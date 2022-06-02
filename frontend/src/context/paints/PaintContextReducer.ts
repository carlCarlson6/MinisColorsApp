import { Paint } from "../../models/Paint";
import { Action } from "../Action";
import { PaintState } from "./PaintContextState";
import { PaintTypes } from "./PaintTypes";

export const paintReducer = (state: PaintState, action: Action<Paint[]>): PaintState => {
    switch(action.type) {
        case PaintTypes.StartRequestPaintByName:
            return { ...state, fetchingData: true };

        case PaintTypes.OkRequestPaintByName:
            return { ...state, fetchingData: false, lastRequestOk: true, paints: action.payload };

        case PaintTypes.KoRequestPaintByName:
            return { ...state, fetchingData: false, lastRequestOk: false }

        default: return state;
    }
}