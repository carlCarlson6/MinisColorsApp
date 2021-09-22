import { inject, injectable } from "inversify";
import { Color } from "../../core/entities/Color";
import { Paint } from "../../core/entities/Paint";
import { ColorFactory } from "../../core/services/ColorFactory";
import { PaintsRepository } from "../../core/services/PaintsRepository";
import { ServiceBus } from "../../core/services/ServiceBus";
import { CompanyName } from "../../core/valueObjects/CompanyName";
import { PaintName } from "../../core/valueObjects/PaintName";
import { InjectionTypes } from "../../infrastructure/di/InjectionTypes";
import { GetPaintsByColorQuery } from "./GetPaintsByColorQuery";
import { PaintsByColor } from "./PaintsByColor";

@injectable()
export class GetPaintsByColor {
    private Repository: PaintsRepository;
    private serviceBus: ServiceBus;
    private colorFactory: ColorFactory;

    constructor(@inject(InjectionTypes.PaintsRepository) paintsRepository: PaintsRepository) {
        this.Repository = paintsRepository;
    }

    public async Execute(color: Color): Promise<Array<Paint>> {
        const paints: Array<Paint> = await this.Repository.ReadByColor(color);
        
        if(paints.length == 0) {
            const paintsByColor = await this.SearchPaintsByColor(color);
            paints.push(...paintsByColor);
        }

        return paints;
    }

    public async SearchPaintsByColor(color: Color): Promise<Array<Paint>> {
        const getPaintsByColorQuery: GetPaintsByColorQuery = new GetPaintsByColorQuery(color.HexadecimalCode.Value);
        const paintsByColor: PaintsByColor = await this.serviceBus.Dispatch<GetPaintsByColorQuery, PaintsByColor>(getPaintsByColorQuery);
        return paintsByColor.Paints.map(paintByColor => new Paint(new CompanyName(paintByColor.Company), new PaintName(paintByColor.Name), this.colorFactory.BuildFromHexadecial(paintByColor.HexColorCode)))
    }

}
