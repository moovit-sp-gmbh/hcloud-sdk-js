export type ServiceAccount = {
    _id: string;
    name: string;
    email: string;
    token: string;
    avatarUrl: string;
};

export type ServiceAccountNoToken = Omit<ServiceAccount, "token">;
