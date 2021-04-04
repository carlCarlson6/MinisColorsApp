export class GetPaintsByColorQuery {
    public get HexadecimalCode(): string {
        return this.hexadecimalCode;
    }

    constructor(private readonly hexadecimalCode: string) { }
}