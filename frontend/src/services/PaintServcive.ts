import { Dispatch } from "react";
import { PaintAction } from "../context/paints/PaintAction";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Paint } from "../models/Paint";

export class PaintService {
    private dispatcher: Dispatch<PaintAction>;
    private httpClient: AxiosInstance;
    
    constructor(dispatch: Dispatch<PaintAction>, backendUrl: string) {
        this.dispatcher = dispatch;
        console.log(backendUrl);
        this.httpClient = axios.create({baseURL: backendUrl})
    }

    public async SearchByName(paintName: string): Promise<void> {
        console.log('click on search', paintName);
        
        const response: AxiosResponse<Array<Paint>> = await this.httpClient.get<Array<Paint>>('/paints/'+paintName);

        if(!response) {
            console.log(response);
            return;
        }

        const paints: Array<Paint> = response.data;

        console.log(paints);
    }

}