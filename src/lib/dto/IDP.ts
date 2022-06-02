export interface User {
    _id: string;
    name: string;
    email: string;
    company: string;
}

export interface Token {
    token: string;
}

export interface UserAndToken {
    user: User;
    token: Token;
}

export interface ErrorMessage {
    status: number;
    message: string;
}
