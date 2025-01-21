import { IPointData } from "pixi.js";

export interface IAssetDefinition {
    alias: string;
    src: string;
}

export interface ISizeRef {
    width: number;
    height: number;
}

export interface IButtonConfig {
    iconName: string;
    iconRotation?: number;
    pos: IPointData;
    startEnabled?: boolean;
    eventData: string;
}

export interface IShapeDataResponse {
    Shapes: Array<IShapeDefinition>
}

export interface IShapeDefinition {
    name: string;
    type: "Points" | "Pill";
    data: IPointShape | IPillShape;
}  

export interface IPointShape {
    Points?: Array<IPointData>
}

export interface IPillShape {
    //
}
