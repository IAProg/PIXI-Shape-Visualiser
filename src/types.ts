import { IPointData } from "pixi.js";

export interface IAssetDefinition {
    alias: string;
    src: string;
}

export interface ISizeRef {
    width: number;
    height: number;
}

export interface IPolygonDefinition {
    name: string;
    type: "Points";
    data: IPollyShape;
}  

export interface IPillDefinition {
    name: string;
    type: "Pill";
    data: IPillShape;
}  

export type ShapeDefinition = IPolygonDefinition | IPillDefinition

export interface IShapeDataResponse {
    Shapes: Array<ShapeDefinition>
}

export interface IPollyShape {
    Points: Array<IPointData>
}

export interface IPillShape {
    //
}
