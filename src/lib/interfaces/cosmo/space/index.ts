import { ReducedUser } from "../../idp";
import { ItemType } from "../asset";

export interface CosmoSpace {
    _id: string;
    name: string;
    createDate: number;
    avatarUrl: string;
    creator: ReducedUser;
    type: ItemType.SPACE;
}
