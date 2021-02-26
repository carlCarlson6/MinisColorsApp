import { Paint } from './Paint'

export interface PaintState {
    paints: Array<Paint>;
    fetchingData: boolean;
    lastRequestOk: boolean;
}