import { Color } from "../../entities/Color";
import { Paint } from "../../entities/Paint";
import { PaintName } from "../../valueObjects/PaintName";

export interface PaintsRepository {
    Create(paint: Paint): Promise<number>; 
    ReadAll(): Promise<Paint[]>
    ReadByColor(color: Color): Promise<Paint[]>
    ReadByName(name: PaintName): Promise<Paint[]>
    Update(paint: Paint): Promise<number>
    Delete(paint: Paint): Promise<number>
}