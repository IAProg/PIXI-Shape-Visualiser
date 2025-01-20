import { Application } from "pixi.js";
import { gameConfig } from "./config";
import { Background } from "./components/background";
import { MainMenu } from "./main-menu";
import { Scene } from "./scene/scene";
/**
 * The core of the application. 
 * The application is responsible for managing sub components of the game and conducting high level game flow
 */
export class App extends Application {
    private _background: Background;
    private _mainMenu: MainMenu;
    private _activeScene?: Scene;
    private _isActive: boolean = true;

    constructor(){
        super(gameConfig.canvas)
        this._background = new Background();
        this._mainMenu = new MainMenu();
        
        this.stage.addChild(this._background, this._mainMenu);

        this.scaleContent(this.screen.width, this.screen.height);

        // listen for window resize wait a frame so content scales after renderer
        window.addEventListener("resize", () => 
            requestAnimationFrame(() => {
                this.scaleContent(this.screen.width, this.screen.height);
            })
        );     
        
        this.displayLoop();
    }

    /**
     * main "game" loop. User is able to move to and from features in the main menu
     */
    private async displayLoop(): Promise<void>{
        while (this._isActive){
            this._activeScene = await this._mainMenu.awaitChoice();
            this._mainMenu.renderable = false;

            this.stage.addChild(this._activeScene);
            this.scaleContent(this.screen.width, this.screen.height);
            await this._activeScene.play();

            this.stage.removeChild(this._activeScene);
            this._mainMenu.renderable = true;
            delete this._activeScene;
        }
    }

    /**
     * call resize handler on components 
     */
    private scaleContent(width: number, height: number): void{
        this._background.resize(width, height);
        this._mainMenu.resize(width, height);
        this._activeScene?.resize(width, height);
    }
}