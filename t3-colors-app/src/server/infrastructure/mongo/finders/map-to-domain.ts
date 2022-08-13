import { Color } from "../../../colors/color";
import { Paint } from "../../../colors/paint";
import { Companies } from "../../../companies";
import { PaintsMongoModel } from "../paints-mongo-model";

const toModel = (company: string, paintName: string|undefined, hexCode: string) => ({ company, paintName, hexCode });
const toModels = (paintModel: PaintsMongoModel) => [
    toModel(Companies.ArmyPainter, paintModel.ArmyPainter, paintModel.HexCode),
    toModel(Companies.CoatDarms, paintModel.CoatDarms, paintModel.HexCode),
    toModel(Companies.INSTAR, paintModel.INSTAR, paintModel.HexCode),
    toModel(Companies.INSTARVintage, paintModel.INSTARVintage, paintModel.HexCode),
    toModel(Companies.NewCitadel, paintModel.NewCitadel, paintModel.HexCode),
    toModel(Companies.OldCitadel, paintModel.OldCitadel, paintModel.HexCode),
    toModel(Companies.PrivateerPressP3, paintModel.PrivateerPressP3, paintModel.HexCode),
    toModel(Companies.Rackham, paintModel.Rackham, paintModel.HexCode),
    toModel(Companies.ReaperMaster, paintModel.ReaperMaster, paintModel.HexCode),
    toModel(Companies.Scale75, paintModel.Scale75, paintModel.HexCode),
    toModel(Companies.VallejoGameColor, paintModel.VallejoGameColor, paintModel.HexCode),
    toModel(Companies.VallejoModelColor, paintModel.VallejoModelColor, paintModel.HexCode)
];

export const mapToDomain = (paintModels: PaintsMongoModel[]) => paintModels
    .flatMap(paintModel => toModels(paintModel)
    .filter(model => (model.paintName !== undefined || model.paintName !== "")))
    .map(model => new Paint(model.company, model.paintName!, Color.buildFromHexadecimal(model.hexCode)));