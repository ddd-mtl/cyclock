import { Cloxel } from "./cloxel"
import {Clockface} from "./ui/clockface";

export class ValueView {
    private cloxelList: Cloxel[];
    public name: string;

    constructor(name: string) {
        this.name = name;
    }


}

export function create_time_view(): ValueView {
    let view = new ValueView('timed_value');
    return view;
}