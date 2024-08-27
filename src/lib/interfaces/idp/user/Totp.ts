interface Totp {
    activated: boolean;
    createDate: number;
    modifyDate: number;
}

export interface DeactivatedTotp extends Totp {
    activated: false;
    otpAuthUrl: string;
    qrcode: string;
    secret: string;
}
export interface ActivatedTotp extends Totp {
    activated: true;
    recoverCodes: string[];
}

export interface UserTotp {
    email: string;
    token: string;
}
