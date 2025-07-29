import { ItemType } from "../asset";

export interface Item {
    id: string;
    name: string;
    type: ItemType;
}

export interface Folder {
    id: string;
    name: string;
    type: ItemType.FOLDER;
    breadcrumb: Item[];
    children: Item[];
}
