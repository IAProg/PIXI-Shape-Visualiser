import { Texture, Assets } from "pixi.js";
import { IAssetManifestResponse } from "./types";

/**
 * A simple asset loader. Loading assets from a config allows for some changes to be made without touching the code
 */
export async function loadAssets(): Promise<void>{
    const response = await fetch(`data/assetManifest.json`);
    const data = await response.json() as IAssetManifestResponse; 
    if ( response.status !== 200 ){
        throw data;
    }
    await Assets.load(data.mainfest);
}



/**
 * A wrapper method used to access textures on the loader, if the requested texture does not exist an error is thrown
 */
export function getTexture(textureName: string): Texture{
    const texture = Assets.cache.get(textureName);
    if (texture){
        return texture;
    }
    throw `could not find texture ${textureName}`;
}
