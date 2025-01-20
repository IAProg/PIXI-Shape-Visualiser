import { Texture, Assets } from "pixi.js";
import { IAssetDefinition } from "./types";


/**
 * asset manifest, lists all assets to be loaded
 * 
 */
const textureManifest = [
    { alias: "background", src: "textures/background.png"},
    { alias: "menu-button", src: "textures/menu-button.png"},
    { alias: "scene-bg", src: "textures/scene_bg.png"}
] as Array<IAssetDefinition>



/**
 * A simple asset loader. Loading assets from a config allows for some changes to be made without touching the code
 */
export async function loadAssets(): Promise<void>{
    await Assets.load(textureManifest);
}
/**
 * A wrapper method used to access textures on the loader, if the requested texture does not exist an error is thrown
 */
export function getTexture(textureName: string): Texture{
    const texture = Assets.cache.get(textureName);
    if (texture){
        return texture;
    }
    throw `could not find texture ${textureName}`
}
