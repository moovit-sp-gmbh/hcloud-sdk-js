import { User } from "./User";

export interface SuccessfulAuth {
    user: User;
    token: string;
}
