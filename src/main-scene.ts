
import { Container, Sprite } from "pixi.js";
import { ISizeRef } from "./types";
import { gameConfig } from "./config";
import { getTexture } from "./asset-loader";
import { Button } from "./components/button";

/**
 * The main scene, presents the shape visualiser demo
 */
export class MainScene extends Container {
    private size: ISizeRef;
    private _bg: Sprite;
    private _buttons: Array<Button>;


    constructor(){
        super();
        const { size, buttons } = gameConfig.mainScene;
        this.size = size;

        this._bg = new Sprite( getTexture("scene-bg") );
        this._bg.anchor.set(0.5);

        this._buttons = buttons.map( ( buttonConfig ) => {
            const newButton = new Button( buttonConfig );
            newButton.on("interact", this.buttonHandle.bind(this) )
            return newButton;
        } );
        
        this.addChild( this._bg, ...this._buttons );
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

    private buttonHandle( buttonEvent: string ): void {
        switch (buttonEvent) {
            case "cycle-shape-left":
              break;
            case "cycle-shape-right":
              break;
            case "zoom-in":
              break;
            case "zoom-out":
              break;
            default:
                console.warn(`unhandled UI event ${buttonEvent}`);
          }
    }
}