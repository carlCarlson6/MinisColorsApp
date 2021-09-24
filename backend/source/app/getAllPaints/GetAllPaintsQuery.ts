import { BusMessage } from "../../core/services/BusMessage";

export class GetAllPaintsQuery implements BusMessage {
    public readonly MessageName: string;

    constructor() {
        this.MessageName = GetAllPaintsQuery.name;
    }
}
