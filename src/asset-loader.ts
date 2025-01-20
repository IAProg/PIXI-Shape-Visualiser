import { Loader, Texture } from "pixi.js";
import { IAssetDefinition } from "./types";


/**
 * asset manifest, lists all assets to be loaded
 * realistically though would be loaded externally
 * 
 */
const textureManifest = [
    { name: "background", url: "background.png"},
    { name: "menu-button", url: "menu-button.png"},
    { name: "close-button", url: "close-button.png"},
    { name: "scene-bg-1", url: "scene_bg_01.png"},
    { name: "scene-bg-2", url: "scene_bg_02.png"},
    { name: "scene-bg-3", url: "scene_bg_03.png"},
    { name: "emoji-1", url: "emoji-1.png"},
    { name: "emoji-2", url: "emoji-2.png"},
    { name: "emoji-3", url: "emoji-3.png"},
    { name: "emoji-4", url: "emoji-4.png"},
    { name: "emoji-5", url: "emoji-5.png"},
    { name: "dollar", url: "dollar.png"},
    { name: "card-1", url: "card1.png"},
    { name: "card-2", url: "card2.png"},
    { name: "card-3", url: "card3.png"},
    { name: "card-4", url: "card4.png"},
    { name: "card-5", url: "card5.png"},
    { name: "card-6", url: "card6.png"},
    { name: "card-7", url: "card7.png"},
    { name: "card-8", url: "card8.png"},
    { name: "fire-1", url: "fire-1.png"},
    { name: "fire-2", url: "fire-2.png"},
    { name: "fire-base", url: "fire-base.png"}
] as Array<IAssetDefinition>



/**
 * object to hold all known textures - this is necessary because the supplied assets mix animations with other textures
 */
const textureCache = {} as { [key: string]: Texture };

/**
 * A simple asset loader. Loading assets from a config allows for some changes to be made without touching the code
 */
export function loadAssets(): Promise<void>{
    const loader = Loader.shared;
    loader.baseUrl = "textures/";

    return new Promise((resolve) => {
        loader.add(textureManifest);

        loader.onLoad.add(( loader, resource ) => {
            // handle texture 
            if ( resource.texture ) {
                textureCache[resource.name] = resource.texture;
            }
        } );

        loader.load(() => resolve());
    });
}


/**
 * A wrapper method used to access textures on the loader, if the requested texture does not exist an error is thrown
 */
export function getTexture(textureName: string): Texture{
    const texture = textureCache[textureName];
    if (texture){
        return texture;
    }
    throw `could not find texture ${textureName}`
}