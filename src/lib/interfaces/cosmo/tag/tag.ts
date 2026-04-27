export interface Tag {
    _id: string;
    name: string;
    color: string;
    position: number;
}

export interface CreateTag {
    name: string;
    color?: string;
}

export interface PatchTag {
    name?: string;
    color?: string;
}
