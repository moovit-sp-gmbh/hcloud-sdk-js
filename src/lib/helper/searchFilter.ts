import {
    SearchFilter,
    SearchFilterComparatorBoolean,
    SearchFilterComparatorDate,
    SearchFilterComparatorNumber,
    SearchFilterComparatorString,
    SearchFilterType,
} from "../interfaces/global/searchFilters";

class SearchFilterDTO {
    private type: SearchFilterType;
    private key: string;
    private comparator: SearchFilterComparatorString | SearchFilterComparatorNumber | SearchFilterComparatorDate | SearchFilterComparatorBoolean;
    private value: string | number | boolean | string[];

    constructor(searchFilter: SearchFilter) {
        this.type = searchFilter.type;
        this.key = searchFilter.key;
        this.comparator = (searchFilter as any).comparator;
        this.value = (searchFilter as any).value;
    }
}

export { SearchFilterDTO };
