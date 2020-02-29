import {ClockModel} from "./clockModel";
import {ClockCanvas} from "./ui/clockCanvas";
import {create_time_system} from "./MixedRadix/NumeralSystemFactory";
import {MixedRadixVariable} from "./MixedRadix/MixedRadixVariable";
import {ClockDisplayType, Clockface} from "./ui/clockface";

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
  rootCanvas.app.loader
      //.addCloxel("images/26.jpg")
      .load(setup);
  clockface = new Clockface(rootCanvas, clockModel, 0.9, ClockDisplayType.TOP_ONLY);
  clockface.addHand("now", 0, 0.5);
  clockface.addHand("now", 1, 0.7);
  clockface.addHand("now", 2, 0.85);
  clockface.addHand("now", 3, 0.99);
  rootCanvas.addFrameCallback(set_now_digits);

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






