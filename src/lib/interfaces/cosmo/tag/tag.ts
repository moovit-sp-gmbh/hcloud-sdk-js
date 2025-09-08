export interface Tag {
    _id: string;
    name: string;
    color: string;
}

export interface CreateTag {
    name: string;
    color?: string;
}

export interface PatchTag {
    color: string;
}
