import { ReducedUser } from "../../../idp";

export interface Secret {
    key: string;
    value?: string;
    encrypted: boolean;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
}
