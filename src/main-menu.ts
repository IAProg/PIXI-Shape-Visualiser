
import { Container } from "pixi.js";
import { ISizeRef } from "./types";
import { gameConfig } from "./config";
import { Scene } from "./scene/scene";
import { MenuButton } from "./components/menuButton";
import { SceneTwo } from "./scene/scene-two";
import { SceneOne } from "./scene/scene-one";
import { SceneThree } from "./scene/scene-three";

/**
 * The main menu. Presents 3 feature selection options
 */
export class MainMenu extends Container {

    private _choiceResolve?: (e: Scene) => void;
    private size: ISizeRef;

    constructor(){
        super();

        const { btn1Pos, btn2Pos, btn3Pos, size } = gameConfig.mainMenu;

        const button1 = new MenuButton( "Demo - 1", () => {
            this.onSelect( new SceneOne() );
        } );
        button1.position.copyFrom(btn1Pos);

        const button2 = new MenuButton( "Demo - 2", () => {
            this.onSelect( new SceneTwo() );
        } );
        button2.position.copyFrom(btn2Pos);

        const button3 = new MenuButton( "Demo - 3", () => {
            this.onSelect( new SceneThree() );
        } );
        button3.position.copyFrom(btn3Pos);

        this.addChild(button1, button2, button3);

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

    /**
     * returns a promise which is resolved when all symbols have been revealed
     */
    public awaitChoice(): Promise<Scene>{
        return new Promise((resolve) => {
           this._choiceResolve = resolve;
        });
    }

    private onSelect( scene: Scene ): void {
        if ( this._choiceResolve ){
            this._choiceResolve( scene );
        }
    }
}