import { Color } from "../entities/Color";
import { Paint } from "../entities/Paint";

export interface IPaintsRepository {
    Create(paint: Paint): Promise<number>; 
    ReadAll(): Promise<Array<Paint>>
    Read(color: Color): Promise<Array<Paint>>
    Update(paint: Paint): Promise<number>
    Delete(paint: Paint): Promise<number>
}