import { Container, Sprite, Texture } from "pixi.js";
import { ISizeRef } from "../types";
import { gameConfig } from "../config";
import { getTexture } from "../asset-loader";



/**
 * A base class provided boilerplate for scenes
 * provides a background, resize functionality, and a close button
 */
export abstract class Scene extends Container {
    protected _backdrop: Sprite;
    protected size: ISizeRef;
    protected _closeButton: Sprite; 
    protected _resolveFeature?: (e: void) => void;
    
    constructor( backdropTexture: Texture ){
        super();
        const { padX, padY, closeBtnPos } = gameConfig.scene;

        this._backdrop = new Sprite(backdropTexture);
        this._backdrop.anchor.set(0.5);

        this._closeButton = new Sprite(getTexture("close-button"));
        this._closeButton.anchor.set(0.5);
        this._closeButton.position.copyFrom(closeBtnPos);
        this._closeButton.interactive = this._closeButton.buttonMode = true;
        this._closeButton.on("pointerdown", () => {
            if ( this._resolveFeature ) this._resolveFeature();
        });
        
        this.size = {
            width:  padX * this._backdrop.width,
            height: padY * this._backdrop.height
        };

        this.addChild(this._backdrop, this._closeButton);
    }

    public abstract play(): Promise<void>;

    /**
     * resize handler.
     * scales to fit the game stage
     * @param width - width of the game screen
     * @param height - width of the game screen
     */
    public resize(width: number, height: number): void{
        this.scale.set(Math.min(
            width  / this.size.width,
            height / this.size.height
        ));

        this.position.set(
            width * 0.50,
            height * 0.50
        );
    }

    /**
     * returns a promise which is resolved when close button is pressed
     */
    protected awaitClose(): Promise<void>{
        return new Promise((resolve) => {
           this._resolveFeature = resolve;
        });
    }
}