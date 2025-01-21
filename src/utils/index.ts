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