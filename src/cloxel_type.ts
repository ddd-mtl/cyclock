import {Cyclock} from "./cyclock";
import {Ray} from "./cloxel_elements/ray";
import {CyCircle} from "./cloxel_elements/circle";
import {Cloxel} from "./cloxel";
import {Slice} from "./cloxel_elements/slice";
import {Band} from "./cloxel_elements/band";
import {CyText} from "./cloxel_elements/text";

export enum CloxelType {
    Ray,
    Circle,
    Slice,
    Band,
    Text,
    Sprite
}

export function create_cloxel(owner: Cyclock, cloxel_desc: object): Cloxel {
    const count_str = '_' + owner.element_count();
    const el = cloxel_desc['type'];
    switch (el) {
        case CloxelType.Ray: {
            const name = 'ray' + count_str;
            return new Ray(owner, name, owner.main_color, cloxel_desc["phase"]);
        }
        case CloxelType.Circle: {
            const name = 'circle' + count_str;
            return new CyCircle(owner, name, owner.main_color, owner.bg_color, cloxel_desc["radius_pct"]);
        }
        case CloxelType.Slice: {
            const name = 'slice' + count_str;
            return new Slice(owner, name, owner.bg_color, owner.main_color, cloxel_desc["phase"], cloxel_desc["width"]);
        }
        case CloxelType.Band: {
            const name = 'band' + count_str;
            return new Band(owner, name, owner.bg_color, owner.main_color, cloxel_desc["phase"], cloxel_desc["width"], cloxel_desc["start"], cloxel_desc["end"]);
        }
        case CloxelType.Text: {
            const name = 'text' + count_str;
            return new CyText(owner, name, owner.main_color, cloxel_desc["phase"], cloxel_desc["distance"], cloxel_desc["message"], true);
        }
        default:
            console.error('unknown enum variant');
            break;
    }
}