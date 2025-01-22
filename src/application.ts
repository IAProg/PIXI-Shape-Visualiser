import { Application } from "pixi.js";
import { appConfig } from "./config";
import { MainScene } from "./main-scene";
import { Background } from "./components/background";

/**
 * The core of the application. 
 * The application is responsible for managing sub components and conducting high level logic flow
 */
export class App extends Application<HTMLCanvasElement> {
    private _bg: Background;
    private _mainScene: MainScene;

    constructor(){
        super(appConfig.canvas)
        this._bg = new Background();
        this._mainScene = new MainScene();

        this.stage.addChild(this._bg, this._mainScene);

        this.scaleContent(this.screen.width, this.screen.height);

        // listen for window resize wait a frame so content scales after renderer
        window.addEventListener("resize", () => 
            requestAnimationFrame(() => {
                this.scaleContent(this.screen.width, this.screen.height);
            })
        );     

        this.ticker.add( this._mainScene.update, this._mainScene );
    }

    /**
     * call resize handler on components 
     */
    private scaleContent(width: number, height: number): void{
        this._bg.resize(width, height);
        this._mainScene.resize(width, height);
    }
}