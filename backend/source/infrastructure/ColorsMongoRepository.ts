import { injectable } from "inversify";
import { Color } from "../core/entities/Color";
import { IColorsRepository } from "../core/services/IColorsRepository";

@injectable()
export class ColorsMongoRepository implements IColorsRepository {
    async Create(color: Color): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async ReadAll(): Promise<Color[]> {
        throw new Error("Method not implemented.");
    }
    async Read(hexCode: String): Promise<Color> {
        throw new Error("Method not implemented.");
    }
    async Update(color: Color): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async Delete(color: Color): Promise<number> {
        throw new Error("Method not implemented.");
    }

}