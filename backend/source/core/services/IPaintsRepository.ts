import { Paint } from "../entities/Paint";

export interface IPaintsRepository {
    Create(paint: Paint): Promise<number>; 
    ReadAll(): Promise<Array<Paint>>
    Read(): Promise<Paint>
    Update(paint: Paint): Promise<number>
    Delete(paint: Paint): Promise<number>
}