import { Dispatch } from "react";
import { Action } from "../context/Action";
import { PaintTypes } from "../context/paints/PaintTypes";
import { Paint } from "../models/Paint";
import { httpClient } from "./Axios";

export default (dispatcher: Dispatch<Action<Paint[]>>) => async (paintName: string) => {
    dispatcher({ payload: [], type: PaintTypes.StartRequestPaintByName });
    
    try {
        const response = await httpClient.get<Array<Paint>>('/paints/'+paintName);
        if(!response) {
            dispatcher({ payload: [], type: PaintTypes.KoRequestPaintByName })
            console.error("someting went wrong with the request");
        }

        dispatcher({ payload: response.data, type: PaintTypes.OkRequestPaintByName });
    }
    catch(error) {
        console.error(error);
        dispatcher({ payload: [], type: PaintTypes.KoRequestPaintByName })
    }
}