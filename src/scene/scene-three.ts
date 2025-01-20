import { Emitter } from "@pixi/particle-emitter";
import { getTexture } from "../asset-loader";
import { Scene } from "./scene";
import { Container, Sprite } from "pixi.js";
import { gameConfig } from "../config";

/**
 * scene showing a flame particle animation 
 */
export class SceneThree extends Scene {
    private _particleContainer: Container;
    private _emitter: Emitter;

    constructor(){
        super(getTexture("scene-bg-3"));  
        this._particleContainer = new Container();

        // parse the config 
        // we need to inject live textures - this should really be done by a pre-processor or particle lib wrapper
        const { particleConfig }  = gameConfig.sceneThree;
        particleConfig.behaviors = particleConfig.behaviors.map(( behaviour ) => {
            if ( behaviour.type === "textureRandom" ){
                behaviour.config.textures = behaviour.config.textureNames.map( (textureName) => 
                    getTexture(textureName)
                );
            }
            return behaviour;
        })

        this._emitter = new Emitter(
            this._particleContainer as any,
            particleConfig
        );

        const fireBase = new Sprite(getTexture("fire-base"));
        fireBase.anchor.set(0.5);
        fireBase.position.copyFrom(particleConfig.pos);

        this._emitter.autoUpdate = true;
        this.addChild(fireBase, this._particleContainer);        
    }

    /**
     * play through current scene
     */
    public async play(): Promise<void>{
        await this.awaitClose();
        this._cleanUpScene();
    }

    /**
     *  Clean up any processing associated with scene so it can be safely disposed 
     */
    private _cleanUpScene(): void{
        this._emitter.destroy();
    }
}