import { IApplicationOptions, ITextStyle } from "pixi.js";
import { ISizeRef } from "./types";


/**
 * config for components of the application
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
        size: { width: 540, height: 740 } as ISizeRef,
        title: {
            pos: {x: 0, y: -350},
            style: {
                dropShadow: true,
                dropShadowAlpha: 0.6,
                dropShadowAngle: 1.2,
                dropShadowBlur: 6,
                fill: 0x1d2325,
                fontWeight: "700",
                letterSpacing: 4
            } as Partial<ITextStyle>
        },
        shape: {
            pos: {x: 0, y: 0},
        }
    },
    shapeDisplay:{
        maxZoom: 400,
        minZoom: 10,
        defaultZoom: 150,
        rotationSpeed: 0.05,
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


