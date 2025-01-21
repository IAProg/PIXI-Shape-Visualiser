
import { Container, Sprite } from "pixi.js";
import { ISizeRef } from "./types";
import { gameConfig } from "./config";
import { getTexture } from "./asset-loader";

/**
 * The main scene, presents the shape visualiser demo
 */
export class MainScene extends Container {
    private size: ISizeRef;
    private _bg: Sprite;


    constructor(){
        super();
        const { size } = gameConfig.mainScene;
        this.size = size;

        this._bg = new Sprite( getTexture("scene-bg") );
        this._bg.anchor.set(0.5);

        this.addChild( this._bg );
    }

    /**
     * resize handler.
     * scales to fit the main stage
     * @param width - width of the screen
     * @param height - width of the screen
     */
    public resize(width: number, height: number): void{
        this.scale.set(Math.min(
            width  / this.size.width,
            height / this.size.height
        ));

        this.position.set(
            width * 0.50,
            height * 0.50
        )
    }
}