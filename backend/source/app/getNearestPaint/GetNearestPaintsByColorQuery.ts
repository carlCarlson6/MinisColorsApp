export class GetNearestPaintsByColorQuery {
    public get HexadecimalCode(): string {
        return this.hexadecimalCode;
    }

    constructor(private readonly hexadecimalCode: string) { }

}