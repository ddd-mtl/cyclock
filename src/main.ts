import {ClockModel} from "./clockModel";
import {ClockCanvas} from "./ui/clockCanvas";
import {create_time_system} from "./MixedRadix/NumeralSystemFactory";
import {MixedRadixVariable} from "./MixedRadix/MixedRadixVariable";
import {ClockDisplayType, Clockface} from "./ui/clockface";

// globals
let clockModel;
let rootCanvas;
let clockface;
let now_mxn;

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
  now_mxn = new MixedRadixVariable("now", 0, timeSystem);
  set_now_digits();
  clockModel.addVariable(now_mxn);

  // Setup UI
  rootCanvas = ClockCanvas.create();
  clockface = new Clockface(rootCanvas, clockModel, 0.9, ClockDisplayType.TOP_ONLY);
  clockface.addHand("now", 0, 0.9);
  clockface.addHand("now", 1, 0.7);
  rootCanvas.addFrameCallback(set_now_digits);

  rootCanvas.run();
}

function set_now_digits(delta?: number) {
  const now = new Date();
  now_mxn.setDigits([now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()]);
}






