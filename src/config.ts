import { IApplicationOptions } from "pixi.js";
import { ISizeRef } from "./types";


/**
 * A game config allows for components of the game to be fine tuned from a single location with no changes need in the code structure.
 * With some more time this would have been loaded externally as JSON - although there is an argument for adding types here instead.
 */
export const appConfig = {
    canvas:{
        width: 640,
        height: 640,
        antialias: true,
        autoDensity: true,
        resolution: 2,
        resizeTo: window,
        backgroundColor: 0xffffff
    } as Partial<IApplicationOptions>,
    mainScene:{
        size: { width: 1100, height: 740 } as ISizeRef,
        title: {
            pos: {x: 0, y: -350},
        },
        shape: {
            pos: {x: 0, y: -50},
        }
    },
    shapeDisplay:{
        lineColours: [
            0xAA768D,
            0x79A16D,
            0xD8BA43,
            0x91CFE2
        ],
        fillColours: [
            0xE0B9C9,
            0xBADAAD,
            0xFFF4C6,
            0x478FA5
        ],
        lineWidths: [
            2,
            4,
            6,
            8
        ]
    }
} 


