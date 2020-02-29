import * as PIXI from "pixi.js"
import { Clockface, ClockDisplayType } from "./clockface"
import {ClockModel} from "../clockModel";

export class ClockCanvas {
    // -- fields -- //
    public app: PIXI.Application;
    public canvasSize: number;
    private currentLoop: (delta: number) => void;
    private clock_list: Clockface[];
    private frameCallbackList: {(delta: number): void;} [];


    // -- static -- //

    static create(params?: object): ClockCanvas {
        let canvas_size = Math.min(window.innerHeight, window.innerWidth);

        //Create a Pixi Application
        let app = new PIXI.Application({
                width: canvas_size,  // default: 800
                height: canvas_size, // default: 600
                antialias: true,     // default: false
                transparent: false,  // default: false
                resolution: 1        // default: 1
            }
        );

        // change bg color
        app.renderer.backgroundColor = 0x561639;

        // full window (+ 0 border style)
        // or use scaleToWindow: https://github.com/kittykatattack/scaleToWindow
        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        // app.renderer.autoResize = true;
        app.renderer.resize(canvas_size, canvas_size);

        document.body.appendChild(app.view);

        let canvas = new ClockCanvas(app);
        // addCloxel sprite with texture
        // app.loader
        //     //.addCloxel("images/26.jpg")
        //     .load(canvas.setup);
        return canvas;
    }

    //  -- methods -- //

    constructor(app: PIXI.Application) {
        this.app = app;
        this.canvasSize = app.screen.width;
        this.frameCallbackList = [];
        this.currentLoop = this.noop;
        this.clock_list = [];
    }

    addClock(clock: Clockface) {
            this.clock_list.push(clock);
    }

    run() {
        this.currentLoop = this.mainLoop;
    }

    stop() {
        this.currentLoop = this.noop;
    }

    addFrameCallback(fn: (delta: number) => void) {
        this.frameCallbackList.push(fn);
    }

    removeFrameCallback(fn: () => void) {
        this.frameCallbackList = this.frameCallbackList.filter(obj => obj !== fn);
    }

    // /**
    //  *     This code will run when the pixi.loader has finished loading startup images
    //  */
    // private setup() {
    //     //Start the main loop
    //     this.app.ticker.add(delta => this.pixiLoop(delta));
    //
    //     // Enable interactions
    //     this.app.renderer.plugins.interaction.on('pointerup', onClick);
    //     function onClick (event) {
    //         console.log('event = ' + JSON.stringify(event))
    //     }
    // }

    //  -- methods -- //

    /// Called by ticker
    private pixiLoop(delta) {
        this.currentLoop(delta);
    }

    private noop(delta) {
        // n/a
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
            for (let clock of this.clock_list) {
                clock.resize(this.canvasSize);
            }
        }
        // Process callbacks
        for (let callback of this.frameCallbackList) {
            callback(delta);
        }
        // update clocks
        for (let clock of this.clock_list) {
            clock.update(delta);
        }
    }

} // ClockCanvas class