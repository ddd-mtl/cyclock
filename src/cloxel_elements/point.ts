import {Cloxel} from "../cloxel";
import {Ray} from "../cloxel_elements/ray";
import {CyclockUI} from "../cyclockUI";
import {toClockAngle} from "../clock_utils";

/**
 * Distance and radix based (i.e. (d,x)) positioned element
 */
export class CyPoint extends Ray {
    public distance: number;

    constructor(owner: CyclockUI, name: string, color: number, phase: number, distance: number) {
        super(owner, name, color, phase);
        this.distance = distance;
    }

    getXY(): number[] {
        const phi = toClockAngle(this.phase, this.owner.radix);
        const x = this.owner.radius * this.distance * Math.cos(phi);
        const y = this.owner.radius * this.distance * Math.sin(phi);
        return [x, y];
    }
}