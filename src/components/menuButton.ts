import { Container, Sprite, Text } from "pixi.js";
import { getTexture } from "../asset-loader";
import { gameConfig } from "../config";

/**
 * Provides a resuable menu button with callback and configurable text label.
 */
export class MenuButton extends Container {

    private _bg: Sprite;
    private _text: Text;
    
    constructor( title: string, onClick: Function ){
        super();

        const { textStyle } = gameConfig.menuButton;

        this._bg = new Sprite(getTexture("menu-button"));
        this._bg.anchor.set(0.5);

        this._text = new Text( title , textStyle );
        this._text.anchor.set(0.5);

        this.addChild(this._bg, this._text);

        this._bg.buttonMode = this._bg.interactive = true;
        this._bg.on("pointerdown", () => onClick() );
        
    }
}