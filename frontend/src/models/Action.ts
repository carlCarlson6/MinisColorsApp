import { Paint } from "./Paint";

export interface Action {
    type: string;
    payload: Array<Paint>; 
}