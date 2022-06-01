import { Color } from "../../entities/Color";

export interface ColorsRepository {
    Create(color: Color): Promise<number>; 
    ReadAll(): Promise<Color[]>
    Read(hexCode: String): Promise<Color>
    Update(color: Color): Promise<number>
    Delete(color: Color): Promise<number>
}