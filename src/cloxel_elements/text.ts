import {Clockface} from "../ui/clockface";
import {toClockAngle, toRadian} from "../clock_utils";
import {Cloxel} from "../cloxel";
import {CyPoint} from "./point";
import * as PIXI from "pixi.js";

/**
 * Most basic cloxel:
 * A Ray that goes from center to edge.
 */
export class CyText extends CyPoint {
    public message: string;
    public can_tilt: boolean;
    protected style: PIXI.TextStyle;
    protected text: PIXI.Text;

    private current_draw: Function;
    private can_redraw: boolean;
    private sprite: PIXI.Sprite;

    getDefaultStyle(): PIXI.TextStyle {
        return new PIXI.TextStyle({
            align: 'center',
            fontFamily: "Arial",
            fontSize: 14,
            fill: "black",
            stroke: '#ff3300',
            strokeThickness: 1,
        });
    }

    constructor(owner: Clockface, name: string, radix: number, color: number, phase: number, distance: number, message: string, can_tilt: boolean, style?: PIXI.TextStyle) {
        super(owner, name, radix, color, phase, distance);
        this.can_redraw = true;
        this.message = message;
        this.can_tilt = can_tilt;
        if (style === undefined) {
            this.style = this.getDefaultStyle();
        } else {
            if (style.fontSize <= 0) {
                throw new Error(`Invalid parameter: style.fontSize <= 0`);
            }
            this.style = style;
        }
        this.text = new PIXI.Text(message, this.style);
        //this.text.updateText();
        // if (can_tilt) {
             this.owner.app.stage.addChild(this.text);
        // }
        //this.current_draw = this.draw_curved;
        this.current_draw = can_tilt? this.draw_curved : this.draw_normal;
    }

    draw(delta): void {
        this.current_draw(delta)
    }

    draw_normal(delta): void {
        const coord = this.getXY();
        this.text.anchor.set(0.5, 0.5);
        if (this.can_tilt) {
            this.text.rotation = toRadian(this.phase, this.radix);
        }
        this.text.position.set(
              this.owner.x + coord[0]
            , this.owner.y + coord[1]);
    }

    draw_curved(delta): void {
        // if (!this.can_redraw) {
        //     return;
        // }
        this.owner.app.stage.removeChild(this.sprite);
        this.can_redraw = false;

        //const textMetrics = PIXI.TextMetrics.measureText(this.message, this.style)
        // const textWidth = textMetrics.width;

         const coord = this.getXY();
        // this.text.anchor.set(0.5, 0.5);
        // this.text.rotation = toRadian(this.phase, this.owner.radix);
        // this.text.position.set(
        //     this.owner.x + coord[0]
        //     , this.owner.y + coord[1]);
        //this.text.x = this.owner.x + coord[0];
        //this.text.y = this.owner.x + coord[1];

        // Make container with rope that follows circle
        const maxRopePoints = 100;
        const step = Math.PI / maxRopePoints;

        let ropePoints = maxRopePoints - Math.round((this.text.texture.width / (this.owner.radius * Math.PI)) * maxRopePoints);
        ropePoints /= 2;

        let points = [];
        for (let i = maxRopePoints - ropePoints; i > ropePoints; i--) {
            const x = this.owner.radius * Math.cos(step * i);
            const y = this.owner.radius * Math.sin(step * i);
            points.push(new PIXI.Point(x, -y));
        }

        let container = new PIXI.Container();
        let rope = new PIXI.SimpleRope(this.text.texture, points);
        container.addChild(rope);
        let bounds = container.getLocalBounds();
        let matrix = new PIXI.Matrix();
        matrix.tx = -bounds.x;
        matrix.ty = -bounds.y;

        const options = {width: bounds.width, height: bounds.height, scaleMode: 0, resolution:1};
        let renderTextureOne = PIXI.RenderTexture.create(options);
        this.owner.app.renderer.render(container, renderTextureOne, true, matrix, false);

        this.sprite = new PIXI.Sprite(renderTextureOne);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.rotation = toRadian(this.phase, this.radix);
        this.sprite.position.set(this.owner.x + coord[0], this.owner.y + coord[1]);
        this.owner.app.stage.addChild(this.sprite)
    }
}
