
import { Container } from "pixi.js";
import { ISizeRef } from "./types";
import { gameConfig } from "./config";

/**
 * The main menu. Presents 3 feature selection options
 */
export class MainScene extends Container {
    private size: ISizeRef;

    constructor(){
        super();
        const { size } = gameConfig.mainScene;
        this.size = size;
    }

    public async play(): Promise<void>{
        return;
    }

    /**
     * resize handler.
     * scales to fit the game stage
     * @param width - width of the game screen
     * @param height - width of the game screen
     */
    public resize(width: number, height: number): void{
        this.scale.set(Math.min(
            width  / this.size.width,
            height / this.size.height
        ));

        this.position.set(
            width * 0.50,
            height * 0.50
        )
    }
}