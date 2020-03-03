import {Clockface} from "./ui/clockface";
import {Ray} from "./cloxel_elements/ray";
import {CyHand} from "./cloxel_elements/hand";
import {CyCircle} from "./cloxel_elements/circle";
import {Cloxel} from "./cloxel";
import {CySlice} from "./cloxel_elements/slice";
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

export function createCloxel(owner: Clockface, cloxelDesc: object): Cloxel {
    const count_str = '_' + owner.elementCount();
    const el = cloxelDesc['type'];
    switch (el) {
        case CloxelType.Circle: {
            const name = 'circle' + count_str;
            return new CyCircle(
                owner,
                name,
                owner.lineColor,
                owner.fillColor,
                cloxelDesc["radiusPct"]);
        }
        case CloxelType.Ray: {
            const name = 'ray' + count_str;
            return new Ray(
                owner,
                name,
                cloxelDesc["radix"],
                owner.lineColor,
                cloxelDesc["phase"],);
        }
        case CloxelType.Hand: {
            const name = 'hand' + count_str;
            return new CyHand(
                owner,
                name,
                cloxelDesc["radix"],
                owner.lineColor,
                cloxelDesc["phase"],
                cloxelDesc["lengthPct"],
                cloxelDesc["offsetPct"]);
        }
        case CloxelType.Slice: {
            const name = 'slice' + count_str;
            return new CySlice(
                owner,
                name,
                cloxelDesc["radix"],
                owner.fillColor,
                owner.lineColor,
                cloxelDesc["phase"],
                cloxelDesc["lengthPct"],
                cloxelDesc["offsetPct"],
                cloxelDesc["width"],
                cloxelDesc["canDrawEdge"],
                cloxelDesc["canDrawFill"],
                cloxelDesc["canDrawLabel"],
                cloxelDesc["textStyle"],
                );
        }
        case CloxelType.Band: {
            const name = 'band' + count_str;
            return new Band(
                owner,
                name,
                cloxelDesc["radix"],
                owner.fillColor,
                owner.lineColor,
                cloxelDesc["phase"],
                cloxelDesc["width"],
                cloxelDesc["canDrawEdge"],
                cloxelDesc["canDrawFill"],
                cloxelDesc["canDrawLabel"],
                cloxelDesc["start"],
                cloxelDesc["end"],
                cloxelDesc["textStyle"],
                );
        }
        case CloxelType.Text: {
            const name = 'text' + count_str;
            return new CyText(
                owner,
                name,
                cloxelDesc["radix"],
                owner.lineColor,
                cloxelDesc["phase"],
                cloxelDesc["distance"],
                cloxelDesc["message"],
                cloxelDesc["canTilt"]);
        }
        default:
            console.error('unknown enum variant');
            break;
    }
}