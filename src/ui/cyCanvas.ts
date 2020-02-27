import * as PIXI from "pixi.js"
import { CyclockUI } from "./cyclockUI"

export class CyCanvas {

    public app: PIXI.Application;
    public canvasSize: number;
    private currentLoop: (delta: number) => void;
    private ui: CyclockUI;

    //  -- methods -- //

    constructor(app: PIXI.Application) {
        this.app = app;
        this.canvasSize = app.screen.width;
    }

    /**
     *
     * @param params
     */
    static create(params?: object): CyCanvas {

        let canvas_size = Math.min(window.innerHeight, window.innerWidth);

        //Create a Pixi Application
        let app = new PIXI.Application({
                width: canvas_size,         // default: 800
                height: canvas_size,        // default: 600
                antialias: true,    // default: false
                transparent: false, // default: false
                resolution: 1       // default: 1
            }
        );


        // change bg color
        app.renderer.backgroundColor = 0x561639;

        // full window (+ 0 border style)
        // or use scaleToWindow: https://github.com/kittykatattack/scaleToWindow
        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.autoResize = true;
        app.renderer.resize(canvas_size, canvas_size);

        document.body.appendChild(app.view);

        // add sprite with texture
        app.loader
            //.add("images/26.jpg")
            .load(this.setup);

        //Set the app starting state
        this.currentLoop = this.mainLoop;

        let canvas = new CyCanvas(app);
        return canvas;
    }

    /**
     *     This code will run when the pixi.loader has finished loading startup images
     */
    private setup() {
        //Start the main loop
        this.app.ticker.add(delta => this.pixiLoop(delta));

        // Enable interactions
        this.app.renderer.plugins.interaction.on('pointerup', onClick);
        function onClick (event) {
            console.log('event = ' + JSON.stringify(event))
        }
    }

    //  -- methods -- //

    /// Called by ticker
    private pixiLoop(delta) {
        this.currentLoop(delta);
    }

    /**
     *
     */
    private mainLoop(delta) {
        // check window resize
        const canvasSize = Math.min(window.innerHeight, window.innerWidth);
        if (this.canvasSize != canvasSize) {
            this.canvasSize = canvasSize;
            this.app.renderer.resize(this.canvasSize, this.canvasSize);
            this.ui.resize(this.canvasSize);
        }
        // process frame
        this.ui.update(delta);
    }

} // CyCanvas class