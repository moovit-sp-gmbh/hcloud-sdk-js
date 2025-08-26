import { Asset, Item, ItemType } from "../asset";

export interface Folder extends Item {
    type: ItemType.FOLDER;
    children: (Asset | Folder)[];
}
