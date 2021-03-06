import { Dispatch } from "react";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Paint } from "../models/Paint";
import { Action } from "../models/Action";
import { paintTypes } from "../context/paints/PaintTypes";

export class PaintService {
    private dispatcher: Dispatch<Action>;
    private httpClient: AxiosInstance;
    
    constructor(dispatch: Dispatch<Action>, backendUrl: string) {
        this.dispatcher = dispatch;
        this.httpClient = axios.create({baseURL: backendUrl})
    }

    public async SearchByName(paintName: string): Promise<void> {
        this.dispatcher({ payload: [], type: paintTypes.StartRequestPaintByName })
        try {
            const response: AxiosResponse<Array<Paint>> = await this.httpClient.get<Array<Paint>>('/paints/'+paintName, { headers: {'Access-Control-Allow-Origin': '*'} });
            if(!response) {
                throw new Error("someting went wrong with the request");
            }

            const paints: Array<Paint> = response.data;
            this.dispatcher({ payload: paints, type: paintTypes.OkRequestPaintByName });
        }
        catch(error) {
            this.dispatcher({ payload: [], type: paintTypes.KoRequestPaintByName })
        }
    }

}