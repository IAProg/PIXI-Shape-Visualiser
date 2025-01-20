import { Application, Sprite } from "pixi.js";
import { gameConfig } from "./config";
import { MainScene } from "./main-scene";
import { getTexture } from "./asset-loader";

/**
 * The core of the application. 
 * The application is responsible for managing sub components and conducting high level logic flow
 */
export class App extends Application {
    private _mainScene: MainScene;

    constructor(){
        super(gameConfig.canvas)
        this._mainScene = new MainScene();

        this.stage.addChild(this._mainScene);

        this.scaleContent(this.screen.width, this.screen.height);

        // listen for window resize wait a frame so content scales after renderer
        window.addEventListener("resize", () => 
            requestAnimationFrame(() => {
                this.scaleContent(this.screen.width, this.screen.height);
            })
        );     
    }

    /**
     * call resize handler on components 
     */
    private scaleContent(width: number, height: number): void{
        this._mainScene.resize(width, height);
    }
}