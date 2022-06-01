import { BusMessage } from "../core/services/repositories/BusMessage";
import { GetAllEquivalentPaints } from "./GetAllEquivalentPaints";

export class GetAllEquivalentPaintsQuery implements BusMessage {
    public readonly MessageName = GetAllEquivalentPaints.name;

    constructor(
        readonly PaintName: string
    ) { }
}