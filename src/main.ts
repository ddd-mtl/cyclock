import * as PIXI from "pixi.js"
import {Cyclock} from "./cyclock";
import {CloxelType} from "./cloxel_type";
import {Ray} from "./cloxel_elements/ray";
import {CyCanvas} from "./ui/cyCanvas";


let current_loop;
let main_cyclock;
let cyCanvas;

initApp();

/// starting point
function initApp() {

  cyCanvas = CyCanvas.create();

  // Setup stuff
  // ===========
  main_cyclock = new Cyclock(cyCanvas, 0.50, 12, "main");
  main_cyclock.resize(cyCanvas.size);

}




