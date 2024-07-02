import { ReducedUser } from "../../../idp"

export interface Secret {
    key: string;
    value?: string;
    encrypted: boolean;
    description?: string;
    creator: ReducedUser;
    createDate: number;
    modifyDate: number;
}

export type CreateSecret = Pick<Secret, "key" | "value" | "description" | "encrypted">;
export type UpdateSecret = Pick<Secret, "value" | "description" | "encrypted">;
