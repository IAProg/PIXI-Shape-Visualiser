import { Container, Sprite } from "pixi.js";
import { getTexture } from "../asset-loader";
import { IButtonConfig } from "../types";


/**
 * A simple button class - bundles a base sprite and icon
 * Yields a generic "interact" event with button data 
 */
export class Button extends Container {
    private _baseSprite: Sprite;
    private _icon: Sprite;
    
    constructor( config: IButtonConfig ){
        super();
        this.interactive = true;

        this._baseSprite = new Sprite(getTexture("button"));
        this._baseSprite.anchor.set(0.5);

        this._icon = new Sprite(getTexture(config.iconName));
        this._icon.anchor.set(0.5);
        this._icon.rotation = config.iconRotation || 0;

        this.position.copyFrom( config.pos );
        
        this.on("pointerdown", () => {
            this.emit( "interact", config.eventData )
        } );
        
        this.addChild(this._baseSprite, this._icon );
    }
}