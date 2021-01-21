import { Dispatch } from "react";
import { PaintAction } from "../context/paints/PaintAction";
import axios, { AxiosInstance } from "axios";

export class PaintService {
    private dispatcher: Dispatch<PaintAction>;
    private httpClient: AxiosInstance;
    
    constructor(dispatch: Dispatch<PaintAction>, backendUrl: string) {
        this.dispatcher = dispatch;
        this.httpClient = axios.create({baseURL: backendUrl})
    }
}