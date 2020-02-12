import * as PIXI from "pixi.js"
import {Cyclock} from "./cyclock";
import {CloxelType} from "./cloxel_type";
import {Ray} from "./cloxel_elements/ray";

let canvas_size = Math.min(window.innerHeight, window.innerWidth);

let app;
//let sprite;
let current_loop;
let text_style;

let main_cyclock;
let ray;

init_pixi_app();

/// starting point
function init_pixi_app() {

  //Create a Pixi Application
  app = new PIXI.Application({
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
      .add("images/26.jpg")
      .load(setup);

  // Setup stuff
  // ===========
  main_cyclock = new Cyclock(app, 0.50, 12);
  main_cyclock.resize(canvas_size);
  ray = new Ray(main_cyclock, "hour", 0xff0000, 8);
  main_cyclock.insert(ray);
  // main_cyclock.add(CloxelType.Circle, {radius_pct: 0.5});
  // main_cyclock.add(CloxelType.Ray, {phase: 3});
  //main_cyclock.add(CloxelType.Slice, {phase: 1.5, width: 3});
  //main_cyclock.add(CloxelType.Band, {phase: 6, width: 11.999999, start: 0.5, end: 1.0});
  // Nuclear
  main_cyclock.add(CloxelType.Band, {phase: 10, width: 2.2, start: 0.0, end: 1.0});
  main_cyclock.add(CloxelType.Band, {phase: 2, width: 2.2, start: 0.0, end: 1.0});
  main_cyclock.add(CloxelType.Band, {phase: 6, width: 2.2, start: 0.0, end: 1.0});
  init_text();
  //Set the app starting state
  current_loop = main_loop;
}


// init text styles
function init_text() {
  text_style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fill: "white",
    stroke: '#ff3300',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
  });
}


//This code will run when the pixi.loader has finished loading startup images
function setup() {
  //init_clock(app)
  //Start the main loop
  app.ticker.add(delta => pixi_loop(delta));

  // Enable interactions
  app.renderer.plugins.interaction.on('pointerup', onClick);
  function onClick (event) {
    console.log('event = ' + JSON.stringify(event))
  }
}

function draw_text(text) {
  let message = new PIXI.Text(text, text_style);
  message.position.set(54, 196);
  app.stage.addChild(message);
  return message;
}

/// Called by ticker
function pixi_loop(delta) {
  current_loop(delta);
}

/// main loop
function main_loop(delta) {
  // sprite.x += sprite.vx;
  // sprite.rotation += 0.05;
  // draw_clock(app, delta)

  const current_canvas_size = Math.min(window.innerHeight, window.innerWidth);
  if (canvas_size != current_canvas_size) {
    canvas_size = current_canvas_size;
    app.renderer.resize(canvas_size, canvas_size);
    main_cyclock.resize(canvas_size);
  }
  main_cyclock.update(delta);
}
