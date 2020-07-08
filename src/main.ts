import {ClockModel} from "./clockModel";
import {ClockCanvas} from "./ui/clockCanvas";
import {create_time_system} from "./MixedRadix/NumeralSystemFactory";
import {MixedRadixVariable} from "./MixedRadix/MixedRadixVariable";
import {ClockDisplayType, Clockface} from "./ui/clockface";
import * as PIXI from "pixi.js";
import {GlowFilter} from "@pixi/filter-glow";
import {BevelFilter} from "@pixi/filter-bevel";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin.js";

gsap.registerPlugin(PixiPlugin);

// globals
let clockModel;
let rootCanvas;
let clockface;
let now_mrv;

const teal = 0x8DD3C7;
const yellow = 0xffffb3;
const red = 0xFB8072;
const purple = 0xbebada;
const blue = 0x80B1D3;
const orange = 0xF29137;
const white = 0xF8F6F8;

// start
initApp();

var gCircle;

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
  const config = {
    bgColor: orange,
  };
  rootCanvas = ClockCanvas.create(config);
  clockface = new Clockface(rootCanvas, clockModel, 0.9, ClockDisplayType.TOP_ONLY, 0x000000ff, 0xffffffff, false);
  rootCanvas.addFrameCallback(set_now_digits);

  rootCanvas.app.ticker.stop();
  gsap.ticker.fps(60);
  gsap.ticker.add(time => {
    // console.log('gsap ticker: ' + time);
    rootCanvas.app.ticker.update();
    //rootCanvas.pixiLoop(delta);
  });

  clockface.addCircle(white, white, 0.25, 5, true, false);
  let glowy = clockface.addCircle(white, white, 0.5, 6, true, false);
  clockface.addCircle(white, white, 0.75, 5, true, false);
  clockface.addCircle(white, white, 1.0, 5, true, false);
  gCircle = clockface.getCloxel(glowy);
  gCircle.setFilters([new GlowFilter({innerStrength:10, outerStrength:2}), new BevelFilter({rotation: 75, thickness:1, lightAlpha: 0.7, lightColor: 0xffffff, shadowColor:0x222222, shadowAlpha: 0.85})]);

  //gCircle.edge_color = blue;
  //gCircle.radius_pct = 1.0;


  // -- TODO -- //

  // Agenda minutes clock

  // -- Describe UI -- //

  // let labelStyle = new PIXI.TextStyle({
  //   fontSize: 18,
  //   fill: "black",
  //   stroke: '#eeeeee',
  //   strokeThickness: 0.2,
  // });
  // clockface.setLabelStyle(labelStyle);

  // // // Normal day
  // // clockface.addSlice(0, 0, 8.5, "sleep", 0x999999);
  // // clockface.addSlice(0, 8.5, 10.5, "sarah", 0xD3EE52);
  // // clockface.addSlice(0, 10.5, 12.5, "perso", 0xD56300);
  // // clockface.addSlice(0, 12.5, 15.5, "work", 0x0000ff);
  // // clockface.addSlice(0, 15.5, 16.5, "home", 0x882222);
  // // clockface.addSlice(0, 16.5, 19.5, "work", 0x0000ff);
  // // clockface.addSlice(0, 19.5, 21.5, "family", 0xD3EE52);
  // // clockface.addSlice(0, 21.5, 24, "perso", 0xD56300);
  //
  // // Pick-up day
  // clockface.addSlice(0, 0, 8.5, "sleep", purple);
  // clockface.addSlice(0, 8.5, 10, "wake-up", yellow);
  // clockface.addSlice(0, 10, 12.5, "work", blue);
  // clockface.addSlice(0, 12.5, 13.5, "lunch", red);
  // clockface.addSlice(0, 13.5, 17, "work", blue);
  // clockface.addSlice(0, 17, 21.5, "family", yellow);
  // clockface.addSlice(0, 21.5, 24, "perso/jess", teal);
  //
  // // MarkStyle
  // let bigMark = new PIXI.TextStyle({
  //   align: 'center',
  //   fontFamily: "Arial",
  //   fontSize: 60,
  //   fill: "black",
  //   stroke: '#111111',
  //   strokeThickness: 8,
  //   lineHeight: 0.1,
  // });
  // let smallMark = new PIXI.TextStyle({
  //   fontSize: 0,
  //   fill: "black",
  //   stroke: '#333333',
  //   strokeThickness: 3,
  //   lineHeight: 0.05,
  // });
  // clockface.addMarks(0, smallMark); // all
  // clockface.addMarks(0, bigMark, [0,6,12,18]); // specific
  //
  // // Hands of time
  // clockface.addHand("now", 0, true,0.5);
  // clockface.addHand("now", 1, false,0.7);
  // clockface.addHand("now", 2, false,0.80);
  // //clockface.addHand("now", 3, false,0.99);

  // -- Start -- //
  rootCanvas.app.ticker.add(delta => testLoop(delta));
  gsap.to(gCircle, {radius_pct: 1.0, duration: 5, repeat: -1, yoyo: true});

  rootCanvas.run();
}
function testLoop(delta) {
    //gCircle.radius_pct += 0.01;
    //gCircle.radius_pct %= 1.5;
}

// /**
//  * This code will run when the pixi.loader has finished loading startup images
//  */
// function setup() {
//   console.log('SETUP ')
//   //Start the main loop
//   rootCanvas.app.ticker.add(delta => rootCanvas.pixiLoop(delta));
//
//   // Enable interactions
//   rootCanvas.app.renderer.plugins.interaction.on('pointerup', onClick);
//   function onClick (event) {
//     console.log('event = ' + JSON.stringify(event))
//   }
// }

function set_now_digits(delta?: number) {
  const now = new Date();
  now_mrv.setDigits([now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()]);
}






