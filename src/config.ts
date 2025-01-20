import { TextStyle } from "pixi.js";
import { ISizeRef } from "./types";
import { TextStyleSetConfig, TextStyleSpriteConfig } from "./text/pixi-multistyle-text";
import { EmitterConfigV3 } from "@pixi/particle-emitter";


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
    },
    scene:{
        padX: 1.00,
        padY: 1.25,
        closeBtnPos: {x: 330, y: -200},
    },
    mainMenu:{
        size: { width: 800, height: 600 } as ISizeRef,
        padX: 800,
        padY: 600,
        btn1Pos: {x: 0, y: -125},
        btn2Pos: {x: 0, y: 0},
        btn3Pos: {x: 0, y: +125}
    },
    menuButton:{
        textStyle: {
            fill: "#ebe249",
            fontSize: 34,
            fontWeight: "bolder",
            letterSpacing: 5,
            lineJoin: "round",
            strokeThickness: 6
        } as TextStyle
    },
    sceneOne:{
        cardCount: 144,
        stackAPos: {x: -250, y: 225},
        stackBPos: {x: +250, y: 225},
        counterAPos: {x: -175, y: 200},
        counterBPos: {x: +175, y: 200},
        fpsPos: {x: 0, y: -225},
        cardTextures:[
            "card-1",
            "card-2",
            "card-3",
            "card-4",
            "card-5",
            "card-6",
            "card-7",
            "card-8"
        ],
        style:{
            default: {
                fontFamily: "Arial",
                fontSize: "32px",
                fill: "#333333",
                align: "center"
            } as TextStyle,
            card: {
                fontFamily: "Arial",
                fontSize: "10px",
                fill: "#555555",
                align: "center"
            } as TextStyle
        } as TextStyleSetConfig
    },
    sceneTwo:{
        strings: [ 
            "<smallText>The Following Symbols Contribute Towards The Bonus Round:</smallText>\n<sprite style=symbol1/><sprite style=symbol2/><sprite style=symbol3/>\n<smallText>Good Luck!!</smallText>",
            "<sprite style=dollar/><money>10,000!!</money> <bigMoney>BIG MONEY</bigMoney><sprite style=emoji5/>",
            "Bruh<sprite style=emoji2/><sprite style=emoji2/><sprite style=emoji2/><sprite style=emoji2/>",
            "I am evil!! <sprite style=emoji3/>",
            "<sprite style=emoji1/> LMAO!!!! <sprite style=emoji1/><sprite style=emoji1/> WHAT!? <sprite style=emoji1/>",
            "<sprite style=emoji4/> I forgot to put sugar in my tea <sprite style=emoji4/>",
        ],
        style:{
            default: {
                fontFamily: "Arial",
                fontSize: "32px",
                fill: "#333333",
                align: "center"
            } as TextStyle,
            smallText: {
                fontFamily: "Arial",
                fontSize: "20px",
                fill: "#333333",
                align: "center"
            } as TextStyle,
            money: {
                fontFamily: "Arial",
                fontSize: "40px",
                fill: "#40bd0a",
                lineJoin: "round",
                stroke: "#ff0000",
                align: "center"
            } as TextStyle,
            bigMoney: {
                fontFamily: "Arial",
                fontSize: "42px",
                fill: "#ffc800",
                lineJoin: "round",
                stroke: "#ff0000",
                align: "center"
            } as TextStyle,
            emoji1: {
                src: "emoji-1",
                height: 32,
                width: 32,
                yOffset: -4
            } as TextStyleSpriteConfig,
            emoji2: {
                src: "emoji-2",
                height: 32,
                width: 32,
                yOffset: -4
            } as TextStyleSpriteConfig,
            emoji3: {
                src: "emoji-3",
                height: 32,
                width: 32,
                yOffset: -4
            } as TextStyleSpriteConfig,
            emoji4: {
                src: "emoji-4",
                height: 32,
                width: 32,
                yOffset: -4
            } as TextStyleSpriteConfig,
            emoji5: {
                src: "emoji-5",
                height: 32,
                width: 32,
                yOffset: -4
            } as TextStyleSpriteConfig,
            dollar: {
                src: "dollar",
                height: 32,
                width: 32,
                yOffset: -4
            } as TextStyleSpriteConfig,
            symbol1: {
                src: "card-1",
                height: 128,
                width: 88,
                yOffset: -4
            } as TextStyleSpriteConfig,
            symbol2: {
                src: "card-2",
                height: 128,
                width: 88,
                yOffset: -4
            } as TextStyleSpriteConfig,
            symbol3: {
                src: "card-3",
                height: 128,
                width: 88,
                yOffset: -4
            } as TextStyleSpriteConfig
        } as TextStyleSetConfig
    },
    sceneThree: {
        particleConfig: {
            addAtBack: false,
            pos: {x: 0, y: 200},
            frequency: 0.001,
            lifetime: {
                min: 0.1,
                max: 0.25
            },
            maxParticles: 250,
            behaviors:[
                {
                    type: "alpha",
                    config:{
                        alpha:{
                            list: [
                                {time: 0, value: 0.62},
                                {time: 1, value: 0}
                            ]
                        }
                    }
                },
                {
                    type: "color",
                    config:{
                        color:{
                            list: [
                                {time: 0, value: 'fff191'},
                                {time: 0.5, value: 'fc3a52'},
                                {time: 1, value: '333333'},
                            ]
                        }
                    }
                },
                {
                    type: "moveSpeedStatic",
                    config:{
                        max: 1000,
                        min: 1000
                    }
                },
                {
                    type: "scale",
                    config:{
                        minMult: 1,
                        scale: {
                            list: [
                                {time: 0, value:0.16},
                                {time: 1, value:0.5},
                            ]
                        }
                    }
                },
                {
                    type: "rotation",
                    config:{
                        accel: 0,
                        maxSpeed: 50,
                        maxStart: 275,
                        minSpeed: 50,
                        minStart: 265
                    }
                },
                {
                    type: "textureRandom",
                    config:{
                        textureNames: [
                            "fire-1",
                            "fire-2"
                        ]
                    }
                },
                {
                    type: "spawnShape",
                    config:{
                        data: {
                            affectRotation: false,
                            innerRadius: 0,
                            radius: 7.5,
                            x: 0,
                            y: 0                                
                        },
                        type: "torus"
                    }
                }
            ]
        } as EmitterConfigV3
    }
} 


