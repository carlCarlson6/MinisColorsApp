import { Color } from "../colorSystem/Color";
import { PaintName } from "../colorSystem/PaintName";
import { Paint } from "../Paint";

export interface PaintsRepository {
    Create(paint: Paint): Promise<number>; 
    ReadAll(): Promise<Paint[]>
    ReadByColor(color: Color): Promise<Paint[]>
    ReadByName(name: PaintName): Promise<Paint[]>
    Update(paint: Paint): Promise<number>
    Delete(paint: Paint): Promise<number>
}