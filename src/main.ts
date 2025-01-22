import { App } from "./application";
import { loadAssets, loadShapeData } from "./asset-loader";

// simple bootstrap load assets -> start app 
// pixiapp is registered for pixi inspector
loadAssets().then(() => 
    loadShapeData().then(( shapeData ) => {
        const app = new App( shapeData );
        (globalThis as any).__PIXI_APP__ = app;
        document.body.appendChild(app.view)
    })
);


