import {Cyclock} from "./cyclock";
import {Ray} from "./cloxel_elements/ray";
import {CyCircle} from "./cloxel_elements/circle";
import {Cloxel} from "./cloxel";

export enum CloxelType {
    Ray,
    Circle,
    Slice,
    Band,
    Text,
    Sprite
}

export function create_cloxel(owner: Cyclock, el: CloxelType, params: object): Cloxel {
    const count_str = '_' + owner.element_count();
    switch (el) {
        case CloxelType.Ray: {
            const name = 'ray' + count_str;
            return new Ray(owner, name, owner.main_color, params["phase"]);
        }
        case CloxelType.Circle: {
            const name = 'circle' + count_str;
            return new CyCircle(owner, name, owner.main_color, owner.bg_color, params["radius_pct"]);
        }
        default:
            console.error('unknown enum variant');
            break;
    }
}