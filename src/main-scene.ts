
import { Container, Text } from "pixi.js";
import { ISizeRef, ShapeDefinition } from "./types";
import { appConfig } from "./config";
import { ShapeDisplay } from "./components/shapeDisplay";
import { keyboard } from "./utils/keyboard";
import { SelectionList } from "./utils";

/**
 * The main scene, presents the shape visualiser demo
 */
export class MainScene extends Container {
    private size: ISizeRef;
    private _shapeDisplay: ShapeDisplay;
    private _title: Text;
    private _shapeStore: SelectionList<ShapeDefinition>;

    constructor( shapeData: Array<ShapeDefinition> ){
        super();
        this._shapeStore = new SelectionList( shapeData );

        const { size, title, shape } = appConfig.mainScene;
        this.size = size;

        this._title = new Text( this._shapeStore.currentValue.name, title.style );
        this._title.anchor.set(0.5, 0);
        this._title.position.copyFrom(title.pos);

        this._shapeDisplay = new ShapeDisplay( this._shapeStore.currentValue );
        this._shapeDisplay.position.copyFrom(shape.pos);

        this.addChild( this._shapeDisplay, this._title );
    }

    /**
     * resize handler.
     * scales to fit the main stage
     * @param width - width of the stage
     * @param height - width of the stage
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

    /**
     * updates the component in response to user input
     * @param dt - ms since last frame
     */
    public update( dt:number ): void {
      // process "movement" input
      let zoomDir = 0;
      let rotDir = 0
      if ( keyboard.isHeld('ArrowUp') )
        zoomDir += 1
      if ( keyboard.isHeld('ArrowDown') )
        zoomDir -= 1;
      if ( keyboard.isHeld('ArrowLeft') )
        rotDir -= 1;
      if ( keyboard.isHeld('ArrowRight') )
        rotDir += 1

      // apply movement
      if (zoomDir !== 0)
        this._shapeDisplay.zoom(zoomDir, dt);
      if (rotDir !== 0)
        this._shapeDisplay.rotate(rotDir, dt);

      const events = keyboard.getEvents();
      for ( const event of events ) {
        if ( event.type === "keydown" && event.key === "s" )
          this.updateShape();
        if ( event.type === "keydown" && event.key === "e" )
          this._shapeDisplay.cycleLineColour();
        if ( event.type === "keydown" && event.key === "b" )
          this._shapeDisplay.cycleBackgroundColour();
        if ( event.type === "keydown" && event.key === "t" )
          this._shapeDisplay.cycleLineThickness();
      }

      this._shapeDisplay.update();
    }

    /**
     * update the current shape and related components
     */
    private updateShape(): void {
      this._shapeStore.cycle();
      this._title.text = this._shapeStore.currentValue.name;      
      this._shapeDisplay.updateShapeData(this._shapeStore.currentValue);
    }
}