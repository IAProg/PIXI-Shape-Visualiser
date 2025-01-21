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

