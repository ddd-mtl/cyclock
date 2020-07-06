import {Clockface} from "../ui/clockface";
import {Cloxel} from "../cloxel";

/**
 * A circle with fill and edge
 */
export class CyCircle extends Cloxel {
    public radius_pct: number;
    public edge_color: number;
    public edge_alpha: number;
    public can_draw_edge: boolean;
    public can_draw_fill: boolean;
    public bg_color: number;
    public bg_alpha: number;
    public line_width: number;

    constructor(
        owner: Clockface,
        name: string,
        bg_color: number,
        edge_color: number,
        radius_pct: number,
        line_width?: number,
        can_draw_edge?: boolean,
        can_draw_fill?: boolean,
        edge_alpha?: number,
        bg_alpha?: number) {
        super(owner, name);
        this.radius_pct = radius_pct;
        this.edge_color = edge_color;
        this.bg_color = bg_color;
        this.can_draw_edge = can_draw_edge != undefined? can_draw_edge : true;
        this.can_draw_fill = can_draw_fill != undefined? can_draw_fill: true;
        this.edge_alpha = edge_alpha != undefined? edge_alpha : 1.0;
        this.bg_alpha = bg_alpha != undefined? bg_alpha : 1.0;
        this.line_width = line_width != undefined? line_width : 2;
    }

    draw(delta): void {
        this.gfx.clear();
        if (this.can_draw_edge) {
            this.gfx.lineStyle(this.line_width, this.edge_color, this.edge_alpha);
        }
        if (this.can_draw_fill) {
            this.gfx.beginFill(this.bg_color, this.bg_alpha);
        }
        this.gfx.drawCircle(0, 0, this.radius_pct * this.owner.radius);
        if (this.can_draw_fill) {
            this.gfx.endFill();
        }
        this.gfx.x = this.owner.x;
        this.gfx.y = this.owner.y;
    }
}