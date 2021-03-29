import { model, Schema } from "mongoose";

const paintMoongoseModelSchema = new Schema(
    {
        "NewCitadel": String,
        "OldCitadel": String,
        "VallejoGameColor": String,
        "VallejoModelColor": String,
        "INSTAR": String,
        "INSTARVintage": String,
        "Rackham": String,
        "ReaperMaster": String,
        "PrivateerPressP3": String,
        "CoatD'arms": String,
        "ArmyPainter": String,
        "Scale75": String,
        "HexCode": String
    },
    {
        collection: 'Paints'
    }
);

export const PaintMongooseModel = model('Paints', paintMoongoseModelSchema);