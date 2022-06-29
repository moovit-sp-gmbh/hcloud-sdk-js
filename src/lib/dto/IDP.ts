export interface User {
    _id: string;
    name: string;
    email: string;
    company: string;
}

export interface Token {
    token: string;
}
export interface ErrorMessage {
    code: string;
    error: string;
    message: string;
}
