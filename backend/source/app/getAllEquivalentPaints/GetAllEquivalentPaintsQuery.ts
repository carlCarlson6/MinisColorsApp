export class GetAllEquivalentPaintsQuery {

    public get PaintName(): string {
        return this.paintName;
    }

    constructor(private paintName: string){ }
}