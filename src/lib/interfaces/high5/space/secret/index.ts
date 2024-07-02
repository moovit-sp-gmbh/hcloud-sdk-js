import { ReducedUser } from "../../../idp";

export interface Secret {
    key: string;
    value?: string;
    encrypted: boolean;
    description?: string;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
}
