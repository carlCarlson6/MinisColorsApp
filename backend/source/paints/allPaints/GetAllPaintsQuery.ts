import { BusMessage } from "../../bus/BusMessage";
import { GetAllPaints } from "./GetAllPaints";

export class GetAllPaintsQuery implements BusMessage {
    public readonly MessageName = GetAllPaints.name;
}
