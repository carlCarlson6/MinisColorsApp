import { Color } from "../entities/Color";
import { Paint } from "../entities/Paint";
import { PaintName } from "../valueObjects/PaintName";

export interface PaintsRepository {
    Create(paint: Paint): Promise<number>; 
    ReadAll(): Promise<Array<Paint>>
    ReadByColor(color: Color): Promise<Array<Paint>>
    ReadByName(name: PaintName): Promise<Array<Paint>>
    Update(paint: Paint): Promise<number>
    Delete(paint: Paint): Promise<number>
}
