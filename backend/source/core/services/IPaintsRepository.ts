import { Color } from "../entities/Color";
import { Paint } from "../entities/Paint";

export interface IPaintsRepository {
    Create(paint: Paint): Promise<number>; 
    ReadAll(): Promise<Array<Paint>>
    ReadByColor(color: Color): Promise<Array<Paint>>
    ReadByName(name: String): Promise<Array<Paint>>
    Update(paint: Paint): Promise<number>
    Delete(paint: Paint): Promise<number>
}