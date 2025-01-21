import { Graphics } from "pixi.js";
import { IPillShape, IPollyShape, ShapeDefinition } from "../types";
import { transformPoints } from "../utils";

export class ShapeDisplay extends Graphics {
    private _isDirty: boolean = true;
    private _zoom: number;
    private _rotation: number;
    private _shapeDefinition: ShapeDefinition; 
    
    constructor( initialShape: ShapeDefinition ){
        super();

        this._zoom = 10;
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
        this._zoom = Math.max( 10, this._zoom );
        this._isDirty = true;
    }

    public update(): void{
        if ( this._isDirty ){
            this.redraw();
        }
    }

    private redraw(): void {
        const shape = this._shapeDefinition;   
        if ( shape.type === "Points" ) {
            this.drawPoly(shape.data);
        } else {
            this.drawPill(shape.data);
        }

        this._isDirty = false;
    }

    private drawPoly( shapeData: IPollyShape ): void{
        const points = transformPoints( shapeData.Points, this._zoom, this._rotation );
        this.clear(); 
        this.beginFill(0x0)
        this.drawPolygon( points );

    }

    private drawPill( shapeData: IPillShape ): void{
        //
    }
}