import { Graphics, IShape, Point } from "pixi.js";
import { IPillShape, IPollyShape, ShapeDefinition } from "../types";
import { drawRoundedRectangle, SelectionList, transformPoints } from "../utils";
import { appConfig } from "../config";

export class ShapeDisplay extends Graphics {
    private _isDirty: boolean = true;
    private _zoom: number;
    private _rotation: number;
    private _shapeDefinition: ShapeDefinition; 

    private _lineWidth: SelectionList<number>;
    private _lineColour: SelectionList<number>;
    private _fillColour: SelectionList<number>;
    
    constructor( initialShape: ShapeDefinition ){
        super();

        const { lineColours, lineWidths, fillColours } = appConfig.shapeDisplay;
        this._lineWidth = new SelectionList(lineWidths);
        this._lineColour = new SelectionList(lineColours);
        this._fillColour = new SelectionList(fillColours);

        this._zoom = 150;
        this._rotation = 0;
        this._shapeDefinition = initialShape;
    }
    public updateShapeData( shapeDef: ShapeDefinition ): void{
        this._shapeDefinition = shapeDef;
        this._isDirty = true;
    }

    public rotate( dir: number, dt: number ): void {
        this._rotation += (dir * 0.05 * dt);
        this._isDirty = true;
    }

    public zoom( dir: number, dt: number ): void {
        this._zoom += (dir * dt);

        // clamp within safe range
        this._zoom = Math.min( 350, this._zoom );
        this._zoom = Math.max( 50, this._zoom );
        this._isDirty = true;
    }

    public update(): void{
        if ( this._isDirty ){
            this.redraw();
        }
    }

    public cycleBackgroundColour(): void{
        this._fillColour.cycle()
        this._isDirty = true;
    }
    
    public cycleLineThickness(): void{
        this._lineWidth.cycle();
        this._isDirty = true;
    }

    public cycleLineColour(): void{
        this._lineColour.cycle();
        this._isDirty = true;
    }
    

    private redraw(): void {
        const shape = this._shapeDefinition;   
        if ( shape.type === "Poly" ) {
            this.drawPoly(shape.data);
        } else {
            this.drawPill(shape.data);
        }

        this._isDirty = false;
    }

    private drawPoly( shapeData: IPollyShape ): void{
        const points = transformPoints( shapeData.points, this._zoom, this._rotation );
        this.drawPoints( points );
    }

    private drawPill( shapeData: IPillShape ): void{
        const { width, height, radius } = shapeData;
        const points = drawRoundedRectangle(width, height, radius, this._rotation, this._zoom);
        this.drawPoints( points );
    }

    private drawPoints( points: Array<Point> ): void{
        const lineStyle = { width: this._lineWidth.currentValue, color: this._lineColour.currentValue };
        this.clear()
            .beginFill(this._fillColour.currentValue)
            .lineStyle(lineStyle)
            .drawPolygon( points )
            .endFill();      
    }
}