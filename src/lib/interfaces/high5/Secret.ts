export interface Secret {
    key: string;
    value?: string;
    encrypted: boolean;
    createDate: number;
    modifyDate: number;
}
