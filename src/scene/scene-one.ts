import { Sprite, Text, Ticker } from "pixi.js";
import gsap from "gsap";
import { Scene } from "./scene";
import { gameConfig } from "../config";
import { getTexture } from "../asset-loader";
import { delay, getRandomElement } from "../utils";
import MultiStyleText from "../text/pixi-multistyle-text";

/**
 * Scene demonstrating the use of tweens to move cards from one stack to another 
 */
export class SceneOne extends Scene {
    private _stackA: Array<Sprite> = [];
    private _stackB: Array<Sprite> = [];
    private _stackCounters: Map<Array<Sprite>, MultiStyleText>;
    private _fpsCounter: Text;
    private _ticker: Ticker;

    private _isActive: boolean = true;
    
    constructor(){
        super(getTexture("scene-bg-1"))

        const { cardTextures, stackAPos, fpsPos, counterAPos, counterBPos, style } = gameConfig.sceneOne;

        for (let i = 0; i < 144; i++)
        {
            const card = new Sprite(getTexture(getRandomElement<string>(cardTextures)));
            card.anchor.set(0.5, 1);
            card.x = stackAPos.x;
            card.y = stackAPos.y - i * 2;
            this._stackA.push( card );
        }

        this._fpsCounter = new Text("test");
        this._fpsCounter.anchor.set(0.5);
        this._fpsCounter.position.copyFrom(fpsPos);

        const stackACounter = new MultiStyleText("", style);
        stackACounter.anchor.set(0.5);
        stackACounter.position.copyFrom(counterAPos);

        const stackBCounter = new MultiStyleText("", style);
        stackBCounter.anchor.set(0.5);
        stackBCounter.position.copyFrom(counterBPos);
        this._stackCounters = new Map([
            [this._stackA, stackACounter],
            [this._stackB, stackBCounter]
        ]);

        this.updateCounter(this._stackA);
        this.updateCounter(this._stackB);
        
        this._ticker = new Ticker()
        this._ticker.add(() => {
            this._fpsCounter.text = `FPS: ${Math.round(this._ticker.FPS)}`;
        });
        this._ticker.start();
        this.addChild(...this._stackA, this._fpsCounter, stackACounter, stackBCounter);
    }

    /**
     * play through current scene
     */
    public async play(): Promise<void>{
        this._updateLoop();
        await this.awaitClose();
        this._cleanUpScene();
    }

    /**
     * Move card to stack B one at a time
     */
    private async _updateLoop(): Promise<void>{

        let targetCard = this._stackA.pop();
        while ( this._isActive && targetCard ){
            this._teaseCard(targetCard)
            await delay(1000);
            gsap.killTweensOf(targetCard);

            const { stackBPos } = gameConfig.sceneOne;
            const cardX = stackBPos.x;
            const cardY = stackBPos.y - this._stackB.length * 2;
            this._stackB.push(targetCard);

            this.updateCounter( this._stackA );
            gsap.to(targetCard, { rotation: 0, x: cardX, y: cardY, duration: 2, ease: "power3.inOut", onComplete: () => {
                this.updateCounter( this._stackB );
            }});
            this.addChild(targetCard);

            targetCard = this._stackA.pop();
        }
    }

    /**
     * Update counter associated with a stack 
     */
    private updateCounter( stack: Array<Sprite> ): void{
        const counter = this._stackCounters.get(stack);
        if ( counter ){
            counter.text = `<card>card count</card>\n${stack.length}`;
        }
    }   

    /**
     * Tease the top card on the pile with a highlight rotation
     */
    private _teaseCard(topCard: Sprite): void{
        gsap.fromTo(topCard, { rotation: -0.05 }, { delay: 0.1, rotation: +0.05, repeat: -1, yoyo: true, duration: 0.5, ease: "power1.inOut" } );
    }

    /**
     *  Clean up any processing associated with scene so it can be safely disposed 
     */
    private _cleanUpScene(): void{
        this._ticker.destroy();
    }
}