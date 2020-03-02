import {Clockface} from "../ui/clockface";
import {Cloxel} from "../cloxel";

/**
 * A circle with fill and edge
 */
export class CyCircle extends Cloxel {
    public radius_pct: number;
    public edge_color: number;
    public can_draw_edge: boolean;
    public can_draw_fill: boolean;
    public bg_color: number;

    constructor(owner: Clockface, name: string, bg_color: number, color: number, radius_pct: number) {
        super(owner, name);
        this.radius_pct = radius_pct;
        this.edge_color = color;
        this.bg_color = bg_color;
        this.can_draw_edge = true;
        this.can_draw_fill = true;
    }

    draw(delta): void {
        this.gfx.clear();
        if (this.can_draw_edge) {
            this.gfx.lineStyle(2, this.edge_color, 1);
        }
        if (this.can_draw_fill) {
            this.gfx.beginFill(this.bg_color);
        }
        this.gfx.drawCircle(0, 0, this.radius_pct * this.owner.radius);
        if (this.can_draw_fill) {
            this.gfx.endFill();
        }
        this.gfx.x = this.owner.x;
        this.gfx.y = this.owner.y;
    }
}