import { IShapeDefinition } from "./types";


/**
 * Stores state of the shape selection.
 */
class DataModel{
    private _shapeData: Array<IShapeDefinition> = [];
    private _shapeIndex: number = 0;

    public get currentShape(): IShapeDefinition{
        return this._shapeData[this._shapeIndex];
    }
  
    public incrementShapeIndex(): void{
        this._shapeIndex = Math.min( this._shapeIndex + 1, this._shapeData.length - 1 );
    }

    public decrementShapeIndex(): void{
        this._shapeIndex = Math.max( this._shapeIndex - 1, 0 );
    }

    /**
     * process and store response from server
     */
    public async init(): Promise<void> {
        const response = await fetch(`data/shapeData.json`);
        const data = await response.json(); 
        if ( response.status !== 200 ){
            throw data;
        }
        this._shapeData = data.Shapes;
    }

}

export const dataModel = new DataModel();