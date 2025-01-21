import { IApplicationOptions } from "pixi.js";
import { IButtonConfig, ISizeRef } from "./types";


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
        },
        buttons: [
            {
                iconName: "arrow",
                iconRotation: Math.PI * 1.5,
                pos: {x: -74, y: 256},
                eventData: "cycle-shape-left"
            },
            {
                iconName: "arrow",
                iconRotation: Math.PI * 0.5,
                pos: {x: 74, y: 256},
                eventData: "cycle-shape-right"
            },
            {
                iconName: "plus",
                pos: {x: 0, y: 219},
                eventData: "zoom-in"
            },
            {
                iconName: "minus",
                pos: {x: 0, y: 293},
                eventData: "zoom-out"
            }
        ] as Array<IButtonConfig>
    }
} 


