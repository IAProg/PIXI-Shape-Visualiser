import { App } from "./application";
import { loadAssets } from "./asset-loader";
import { dataModel } from "./dataModel";


// simple bootstrap load assets -> start app 
// pixiapp is registered for pixi inspector
dataModel.init().then(() => 
    loadAssets().then(() => {
        const app = new App();
        (globalThis as any).__PIXI_APP__ = app;
        document.body.appendChild(app.view)
    })
);


