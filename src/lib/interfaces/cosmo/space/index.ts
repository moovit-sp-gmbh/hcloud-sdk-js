import { ReducedTeam, ReducedUser } from "../../idp";
import { ItemType } from "../asset";

export interface CosmoSpace {
    _id: string;
    name: string;
    createDate: number;
    avatarUrl: string;
    creator: ReducedUser;
    type: ItemType.SPACE;
    high5_spaceName?: string;
    high5_executionTarget?: string;
}

export interface High5SpaceInfo {
    high5_spaceName: string;
    executionTarget: string;
}

export type SpaceUser = (ReducedUser | ReducedTeam) & { roles: { name: string; _id: string }[]; type: "user" | "team" };
