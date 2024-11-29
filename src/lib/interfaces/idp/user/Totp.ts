interface Totp {
    activated: boolean;
    createDate: number;
    modifyDate: number;
}

export interface DeactivatedTotp extends Totp {
    activated: false;
    secret: string;
    algorithm: string;
    digits: number;
    period: number;
    issuer: string;
}
export interface ActivatedTotp extends Totp {
    activated: true;
    recoverCodes: string[];
}

export interface UserTotp {
    email: string;
    token: string;
}
