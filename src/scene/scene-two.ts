import { getTexture } from "../asset-loader";
import { Scene } from "./scene";
import { delay, getRandomElement } from "../utils";
import { gameConfig } from "../config";
import MultiStyleText, { TextStyleSet, TextStyleSpriteConfig } from "../text/pixi-multistyle-text";

/**
 *
 */
export class SceneTwo extends Scene {
    private _text: MultiStyleText;
    private _slideIndex: number = 0;
    private _isActive = true;
    
    constructor(){
        super(getTexture("scene-bg-2"));

        // parse style config in to TextStyleSet - we need to insert live textures for text sprites
        const { style } = gameConfig.sceneTwo;
        const parsedStyle = {} as TextStyleSet;
        Object.keys(style).forEach(key => {
            let styleSegment = style[key];
            const imageSource = (styleSegment as TextStyleSpriteConfig).src;
            if ( imageSource ) {
                parsedStyle[key] = { 
                    ...styleSegment,
                    src: getTexture(imageSource)
                }
            } else {
                parsedStyle[key] = styleSegment;
            }
        });

        this._text = new MultiStyleText("", parsedStyle );
        this._text.anchor.set(0.5);
        this.addChild(this._text);
        this._updateText();
    }

    /**
     * play through current scene
     */
    public async play(): Promise<void>{
        this._updateLoop();
        await this.awaitClose();
        this._isActive = false;
    }

    private async _updateLoop(): Promise<void>{
        while ( this._isActive ){
            await delay(2000);
            this._slideIndex++;
            this._updateText();
        }
    }
    
    /**
     * update the text to a random combination of options
    */
   private _updateText(): void{
        const strings = gameConfig.sceneTwo.strings;
        const index = (this._slideIndex + strings.length) % strings.length;
        this._text.text = strings[index];
    }
}