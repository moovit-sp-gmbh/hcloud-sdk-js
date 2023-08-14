export interface DeactivatedTotp {
    activated: boolean;
    otpAuthUrl: string;
    qrcode: string;
    secret: string;
    createDate: number;
    modifyDate: number;
}
export interface ActivatedTotp {
    activated: boolean;
    recoverCodes: string[];
    createDate: number;
    modifyDate: number;
}

export interface UserTotp {
    email: string;
    token: string;
}
