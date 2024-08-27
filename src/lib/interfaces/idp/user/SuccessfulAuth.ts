import { User } from ".";

export interface SuccessfulAuth {
    user: User;
    token: string;
}
