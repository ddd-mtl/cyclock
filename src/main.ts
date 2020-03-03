import {ClockModel} from "./clockModel";
import {ClockCanvas} from "./ui/clockCanvas";
import {create_time_system} from "./MixedRadix/NumeralSystemFactory";
import {MixedRadixVariable} from "./MixedRadix/MixedRadixVariable";
import {ClockDisplayType, Clockface} from "./ui/clockface";
import * as PIXI from "pixi.js";

// globals
let clockModel;
let rootCanvas;
let clockface;
let now_mrv;

// start
initApp();

/**
 * Starting point
 */
function initApp() {

  // Create clock model
  // ===========
  let timeSystem = create_time_system();
  clockModel = new ClockModel("main", timeSystem);

  // Create variable
  now_mrv = new MixedRadixVariable("now", 0, timeSystem);
  set_now_digits();
  clockModel.addVariable(now_mrv);

  // Setup UI
  rootCanvas = ClockCanvas.create();
  clockface = new Clockface(rootCanvas, clockModel, 0.9, ClockDisplayType.TOP_ONLY);
  rootCanvas.addFrameCallback(set_now_digits);

  // -- Describe UI -- //

  // let labelStyle = new PIXI.TextStyle({
  //   fontSize: 18,
  //   fill: "black",
  //   stroke: '#eeeeee',
  //   strokeThickness: 0.2,
  // });
  // clockface.setLabelStyle(labelStyle);

  // // Normal day
  // clockface.addSlice(0, 0, 8.5, "sleep", 0x999999);
  // clockface.addSlice(0, 8.5, 10.5, "sarah", 0xD3EE52);
  // clockface.addSlice(0, 10.5, 12.5, "perso", 0xD56300);
  // clockface.addSlice(0, 12.5, 15.5, "work", 0x0000ff);
  // clockface.addSlice(0, 15.5, 16.5, "home", 0x882222);
  // clockface.addSlice(0, 16.5, 19.5, "work", 0x0000ff);
  // clockface.addSlice(0, 19.5, 21.5, "family", 0xD3EE52);
  // clockface.addSlice(0, 21.5, 24, "perso", 0xD56300);

  // Pick-up day
  clockface.addSlice(0, 0, 8.5, "sleep", 0x999999);
  clockface.addSlice(0, 8.5, 9.5, "wake-up", 0xD3EE52);
  clockface.addSlice(0, 9.5, 12.5, "work", 0x0000ff);
  clockface.addSlice(0, 12.5, 14.5, "home", 0x882222);
  clockface.addSlice(0, 14.5, 17, "work", 0x0000ff);
  clockface.addSlice(0, 17, 19.5, "sarah", 0xF9D2DE);
  clockface.addSlice(0, 19.5, 21.5, "family", 0xD3EE52);
  clockface.addSlice(0, 21.5, 24, "perso", 0xD56300);

  // MarkStyle
  let bigMark = new PIXI.TextStyle({
    align: 'center',
    fontFamily: "Arial",
    fontSize: 60,
    fill: "black",
    stroke: '#111111',
    strokeThickness: 8,
    lineHeight: 0.1,
  });
  let smallMark = new PIXI.TextStyle({
    fontSize: 0,
    fill: "black",
    stroke: '#333333',
    strokeThickness: 3,
    lineHeight: 0.05,
  });
  clockface.addMarks(0, smallMark); // all
  clockface.addMarks(0, bigMark, [0,6,12,18]); // specific

  // Hands of time
  clockface.addHand("now", 0, true,0.5);
  clockface.addHand("now", 1, false,0.7);
  clockface.addHand("now", 2, false,0.80);
  //clockface.addHand("now", 3, false,0.99);

  // -- Start -- //

  rootCanvas.run();
}

/**
 * This code will run when the pixi.loader has finished loading startup images
 */
function setup() {
  //Start the main loop
  rootCanvas.app.ticker.add(delta => rootCanvas.pixiLoop(delta));

  // Enable interactions
  rootCanvas.app.renderer.plugins.interaction.on('pointerup', onClick);
  function onClick (event) {
    console.log('event = ' + JSON.stringify(event))
  }
}

function set_now_digits(delta?: number) {
  const now = new Date();
  now_mrv.setDigits([now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()]);
}






