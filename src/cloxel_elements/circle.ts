import {Cyclock} from "../cyclock";
import {Cloxel} from "../cloxel";

/**
 * A circle with fill and edge
 */
export class CyCircle extends Cloxel {
    public radius_pct: number;
    public edge_color: number;
    public can_draw_edge: boolean;
    public can_draw_fill: boolean;

    constructor(owner: Cyclock, name: string, bg_color: number, color: number, radius_pct: number) {
        super(owner, name, bg_color);
        this.radius_pct = radius_pct;
        this.edge_color = color;
        this.can_draw_edge = true;
        this.can_draw_fill = true;
    }

    draw(delta): void {
        this.gfx.clear();
        if (this.can_draw_edge) {
            this.gfx.lineStyle(2, this.edge_color, 1);
        }
        if (this.can_draw_fill) {
            this.gfx.beginFill(this.main_color);
        }
        this.gfx.drawCircle(0, 0, this.radius_pct * this.owner.radius);
        if (this.can_draw_fill) {
            this.gfx.endFill();
        }
        this.gfx.x = this.owner.x;
        this.gfx.y = this.owner.y;
    }
}