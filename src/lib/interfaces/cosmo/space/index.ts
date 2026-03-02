import { ReducedTeam, ReducedUser } from "../../idp";
import { ItemType } from "../asset";

export interface CosmoSpace {
    _id: string;
    name: string;
    createDate: number;
    avatarUrl: string;
    creator: ReducedUser;
    type: ItemType.SPACE;
    trashAutoDelete: boolean;
    trashAutoDeleteTTL: number | null;
    high5_spaceName?: string;
    high5_executionTarget?: string;
    permissions?: string[];
    storageUsed: number;
}

export interface High5SpaceInfo {
    high5_spaceName: string;
    executionTarget: string;
}

export type SpaceUser = (ReducedUser | ReducedTeam) & { roles: { name: string; _id: string }[]; type: "user" | "team" };

export interface TrashPolicy {
    enabled: boolean;
    ttlDays?: number;
}
