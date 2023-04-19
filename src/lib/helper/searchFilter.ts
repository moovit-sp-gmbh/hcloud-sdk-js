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
    private value: string | number | boolean | string[];
    private comparator: SearchFilterComparatorString | SearchFilterComparatorNumber | SearchFilterComparatorDate | SearchFilterComparatorBoolean;

    constructor(searchFilter: SearchFilter) {
        this.type = searchFilter.type;
        this.key = searchFilter.key;
        this.value = (searchFilter as any).value;
        this.comparator = (searchFilter as any).comparator;
    }
}

export { SearchFilterDTO };
