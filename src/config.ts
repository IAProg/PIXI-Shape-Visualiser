import { canvas, IApplicationOptions } from "pixi.js";
import { ISizeRef } from "./types";



/**
 * A game config allows for components of the game to be fine tuned from a single location with no changes need in the code structure.
 * With some more time this would have been loaded externally as JSON - although there is an argument for adding types here instead.
 */
export const gameConfig = {
    canvas:{
        width: 640,
        height: 640,
        antialias: true,
        autoDensity: true,
        resolution: 2,
        resizeTo: window
    } as IApplicationOptions,
    mainScene:{
        size: { width: 800, height: 600 } as ISizeRef,
        padX: 800,
        padY: 600,
        btn1Pos: {x: 0, y: -125},
        btn2Pos: {x: 0, y: 0},
        btn3Pos: {x: 0, y: +125}
    }
} 


