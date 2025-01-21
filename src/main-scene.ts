
import { Container, Sprite, Text } from "pixi.js";
import { ISizeRef } from "./types";
import { appConfig } from "./config";
import { getTexture } from "./asset-loader";
import { Button } from "./components/button";
import { ShapeDisplay } from "./components/shapeDisplay";
import { dataModel } from "./dataModel";
import { keyboard } from "./utils/keyboard";

/**
 * The main scene, presents the shape visualiser demo
 */
export class MainScene extends Container {
    private size: ISizeRef;
    private _bg: Sprite;
    private _buttons: Array<Button>;
    private _shapeDisplay: ShapeDisplay;
    private _title: Text;

    constructor(){
        super();
        const { size, buttons, title, shape } = appConfig.mainScene;
        this.size = size;

        this._bg = new Sprite( getTexture("scene-bg") );
        this._bg.anchor.set(0.5);

        this._title = new Text( dataModel.currentShape.name );
        this._title.anchor.set(0.5, 0);
        this._title.position.copyFrom(title.pos);

        this._shapeDisplay = new ShapeDisplay( dataModel.currentShape );
        this._shapeDisplay.position.copyFrom(shape.pos);

        this.addChild( this._bg, this._shapeDisplay, this._title );
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

    public update( dt:number ): void {
      //this._shapeDisplay.rotate(1, dt);
      //this._shapeDisplay.zoom(1, dt);

      console.log(keyboard.isKeyPressed('a')); // Logs `true` if 'a' is pressed

      this._shapeDisplay.update();
    }

    private updateShape(): void {
      this._title.text = dataModel.currentShape.name;      
      this._shapeDisplay.updateShapeData(dataModel.currentShape);
    }
}