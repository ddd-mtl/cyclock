import {CyclockUI} from "../cyclockUI";
import {CyHand} from "../cloxel_elements/hand";
import {toClockAngle} from "../clock_utils";
import * as PIXI from "pixi.js";

/**
 * A slice of the main circle.
 * A half-circle (arc) than a triangle.
 */
export class Slice extends CyHand {
    public half_width: number;
    public fill_color: number;
    public can_draw_edge: boolean;
    public can_draw_fill: boolean;
    protected triangle_gfx: PIXI.Graphics;


    constructor(owner: CyclockUI, name: string, bg_color: number, color: number, phase: number, length_pct: number, offset_pct: number, width: number) {
        super(owner, name, color, phase, length_pct, offset_pct);
        this.half_width = width / 2;
        this.fill_color = bg_color;
        this.can_draw_edge = true;
        this.can_draw_fill = true;
        // this.triangle_gfx = new PIXI.Graphics();
        // this.owner.app.stage.addChild(this.triangle_gfx);
    }
    draw(delta): void {
        // compute triangle: b is first vertex.
        const phase_start = this.phase - this.half_width;
        const phase_end = this.phase + this.half_width;

        const phi_start = toClockAngle(phase_start, this.owner.radix);
        const phi_end = toClockAngle(phase_end, this.owner.radix);

        const b_x = this.owner.radius * Math.cos(phi_start);
        const b_y = this.owner.radius * Math.sin(phi_start);

        // const c_x = this.owner.radius * Math.cos(phi_end);
        // const c_y = this.owner.radius * Math.sin(phi_end);

        // render half-circle
        this.gfx.clear();
        if (this.can_draw_edge) {
            this.gfx.lineStyle(2, this.main_color, 1);
        }
        this.gfx.beginFill(this.main_color);
        this.gfx.moveTo(0, 0);
        this.gfx.lineTo(b_x, b_y);
        this.gfx.arc(0, 0, this.owner.radius, phi_start, phi_end);
        //this.gfx.arcTo(b_x * 0.5, b_y * 0.5, c_x, c_y, this.owner.radius);
        this.gfx.lineTo(0, 0);
        this.gfx.endFill();
        this.gfx.position.x = this.owner.x;
        this.gfx.position.y = this.owner.y;
    }
    /*
    draw(delta): void {
        // compute triangle: b is first vertex.
        const phase_start = this.phase - this.half_width;
        const phase_end = this.phase + this.half_width;

        const phi_start = toClockAngle(phase_start, this.owner.radix);
        const phi_end = toClockAngle(phase_end, this.owner.radix);

        const b_x = this.owner.radius * Math.cos(phi_start);
        const b_y = this.owner.radius * Math.sin(phi_start);

        const c_x = this.owner.radius * Math.cos(phi_end);
        const c_y = this.owner.radius * Math.sin(phi_end);

        // render triangle
        // draw triangle
        this.triangle_gfx.clear();
        this.triangle_gfx.beginFill(this.main_color, 1);
        this.triangle_gfx.lineStyle(0, this.fill_color, 1);
        this.triangle_gfx.position.x = this.owner.x;
        this.triangle_gfx.position.y = this.owner.y;
        this.triangle_gfx.lineTo(b_x, b_y);
        this.triangle_gfx.lineTo(c_x, c_y);
        this.triangle_gfx.lineTo(0, 0);
        this.triangle_gfx.endFill();


        // render half-circle
        this.gfx.clear();
        if (this.can_draw_edge) {
            this.gfx.lineStyle(2, this.main_color, 1);
        }
        this.gfx.beginFill(this.main_color);
        this.gfx.arc(0, 0, this.owner.radius, phi_start, phi_end);
        this.gfx.endFill();
        this.gfx.x = this.owner.x;
        this.gfx.y = this.owner.y;
    }*/
}