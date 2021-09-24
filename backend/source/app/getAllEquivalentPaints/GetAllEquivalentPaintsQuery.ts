import { BusMessage } from "../../core/services/BusMessage";

export class GetAllEquivalentPaintsQuery implements BusMessage {

    public get PaintName(): string {
        return this.paintName;
    }

    public readonly MessageName: string;

    constructor(
        private readonly paintName: string
    ) { 
        this.MessageName = GetAllEquivalentPaintsQuery.name;
    }

}
