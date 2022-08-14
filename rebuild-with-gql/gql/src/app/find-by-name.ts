import { PaintDto } from "./paint";

export type FindByName = (name: string) => Promise<PaintDto[]>;

