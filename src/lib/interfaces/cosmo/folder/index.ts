import { ItemType } from "../asset";

export interface Item {
    _id: string;
    name: string;
    type: ItemType;
}

export interface Folder {
    _id: string;
    name: string;
    type: ItemType.FOLDER;
    breadcrumb: Item[];
    children: Item[];
}
