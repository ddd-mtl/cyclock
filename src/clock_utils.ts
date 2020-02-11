import * as PIXI from "pixi.js";

// percent position of a point on a cycle ; shifted 45° for clock time.
export function toClockAngle(x, p) { return ((x + p * 0.75) % p) * (2 * Math.PI / p); }

let hand_sec;
let hand_min;
let hand_hour;

export function init_clock(app: PIXI.Application) {

    hand_hour = new PIXI.Graphics();
    hand_hour.lineStyle(5, 0x00FFFF, 1);
    app.stage.addChild(hand_hour);

    hand_min = new PIXI.Graphics();
    hand_min.lineStyle(5, 0x00FFFF, 1);
    app.stage.addChild(hand_min);

    hand_sec = new PIXI.Graphics();
    hand_sec.lineStyle(5, 0x00FFFF, 1);
    app.stage.addChild(hand_sec);

}


export function draw_clock() {
    // Time stuff
    const now = new Date();
    let x, y;

    const canvasWidthHeight = Math.min(window.innerHeight, window.innerWidth);
    const canvasCenter = canvasWidthHeight / 2;

    // hour
    let hour_a = toClockAngle(now.getHours(), 12);
    x = canvasCenter * 0.4 * Math.cos(hour_a);
    y = canvasCenter * 0.4 * Math.sin(hour_a);
    hand_hour.clear();
    hand_hour.lineStyle(5, 0x00FFFF, 1);
    hand_hour.position.x = canvasCenter;
    hand_hour.position.y = canvasCenter;
    hand_hour.lineTo(x, y);

    // minutes
    let min_a = toClockAngle(now.getMinutes(), 60);
    x = canvasCenter * 0.65 * Math.cos(min_a);
    y = canvasCenter * 0.65 * Math.sin(min_a);
    hand_min.clear();
    hand_min.lineStyle(5, 0x00FFFF, 1);
    hand_min.position.x = canvasCenter;
    hand_min.position.y = canvasCenter;
    hand_min.lineTo(x, y);

    // sec
    let sec_a = toClockAngle(now.getSeconds() * 1000 + now.getMilliseconds(), 60000);
    x = canvasCenter * 0.92 * Math.cos(sec_a);
    y = canvasCenter * 0.92 * Math.sin(sec_a);
    hand_sec.clear();
    hand_sec.lineStyle(5, 0x00FFFF, 1);
    hand_sec.position.x = canvasCenter;
    hand_sec.position.y = canvasCenter;
    hand_sec.lineTo(x, y);
}