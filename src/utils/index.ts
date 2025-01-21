import { IPointData, Point } from "pixi.js";

export function transformPoints(points: Array<IPointData>, scale: number, rot: number): Array<Point> {
    const cosTheta = Math.cos(rot);
    const sinTheta = Math.sin(rot);

    return points.map(( point ) => {
        const scaledX = point.x * scale;
        const scaledY = point.y * scale;

        const transformedX = scaledX * cosTheta - scaledY * sinTheta;
        const transformedY = scaledX * sinTheta + scaledY * cosTheta;

        return new Point(transformedX, transformedY);
    });
}

export class SelectionList<T>{
    private _sourceList: Array<T>
    private _index: number = 0;

    constructor( array: Array<T> ){
        this._sourceList = array;
    }

    public cycle(): void{
        this._index++;
    }

    public get currentValue(): T {
        return this._sourceList[this._index % this._sourceList.length];
    }

}