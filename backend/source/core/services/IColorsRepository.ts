import { Color } from "../entities/Color";

export interface IColorsRepository {
    Create(color: Color): Promise<number>; 
    ReadAll(): Promise<Array<Color>>
    Read(hexCode: String): Promise<Color>
    Update(color: Color): Promise<number>
    Delete(color: Color): Promise<number>
}