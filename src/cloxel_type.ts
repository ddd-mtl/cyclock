import {Cyclock} from "./cyclock";
import {Ray} from "./cloxel_elements/ray";
import {CyHand} from "./cloxel_elements/hand";
import {CyCircle} from "./cloxel_elements/circle";
import {Cloxel} from "./cloxel";
import {Slice} from "./cloxel_elements/slice";
import {Band} from "./cloxel_elements/band";
import {CyText} from "./cloxel_elements/text";

export enum CloxelType {
    Circle,
    Ray,
    Hand,
    Slice,
    Band,
    Text,
    Sprite
}

export function create_cloxel(owner: Cyclock, cloxel_desc: object): Cloxel {
    const count_str = '_' + owner.element_count();
    const el = cloxel_desc['type'];
    switch (el) {
        case CloxelType.Circle: {
            const name = 'circle' + count_str;
            return new CyCircle(owner, name, owner.main_color, owner.bg_color, cloxel_desc["radius_pct"]);
        }
        case CloxelType.Ray: {
            const name = 'ray' + count_str;
            return new Ray(owner, name, owner.main_color, cloxel_desc["phase"]);
        }
        case CloxelType.Hand: {
            const name = 'hand' + count_str;
            return new CyHand(owner, name, owner.main_color, cloxel_desc["phase"], cloxel_desc["length_pct"], cloxel_desc["offset_pct"]);
        }
        case CloxelType.Slice: {
            const name = 'slice' + count_str;
            return new Slice(owner, name, owner.bg_color, owner.main_color, cloxel_desc["phase"], cloxel_desc["length_pct"], cloxel_desc["offset_pct"], cloxel_desc["width"]);
        }
        case CloxelType.Band: {
            const name = 'band' + count_str;
            return new Band(owner, name, owner.bg_color, owner.main_color, cloxel_desc["phase"], cloxel_desc["width"], cloxel_desc["start"], cloxel_desc["end"]);
        }
        case CloxelType.Text: {
            const name = 'text' + count_str;
            return new CyText(owner, name, owner.main_color, cloxel_desc["phase"], cloxel_desc["distance"], cloxel_desc["message"], cloxel_desc["can_tilt"]);
        }
        default:
            console.error('unknown enum variant');
            break;
    }
}