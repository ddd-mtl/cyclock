import {MixedRadixVariable} from "../MixedRadix/MixedRadixVariable";
import { Cloxel } from "../cloxel"
import {CyclockUI} from "./cyclockUI";
import {Ray} from "../cloxel_elements/ray";

export class VariableView extends Cloxel {
    protected cloxel_list: Cloxel[];
    protected variable: MixedRadixVariable;

    // methods
    constructor(owner: CyclockUI, name: string, color: number, variable: MixedRadixVariable) {
        super(owner, name, color);
        let ray = new Ray(owner, name + '_ray', color, variable.getValue().getDigits()[0]);
        this.variable = variable;
        this.cloxel_list = [ray];
    }

    /**
     * Draw all owned cloxels
     * @param delta
     */
    draw(delta): void {
        for (let cloxel of this.cloxel_list) {
            cloxel.draw(delta);
        }
    }
}