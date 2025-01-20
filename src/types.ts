import { Point } from "pixi.js";

export interface IAssetDefinition {
    name: string;
    url: string;
}

export interface ISizeRef {
    width: number;
    height: number;
}

export interface IButtonConfig {
    pos: Point;
    onClick: Function;
    tint: number;
}

