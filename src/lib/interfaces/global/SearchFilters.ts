export enum SearchFilterComparatorString {
    IS = "is",
    IS_NOT = "is not",
    STARTS_WITH = "starts with",
    ENDS_WITH = "ends with",
    CONTAINS = "contains",
}

export enum SearchFilterComparatorNumber {
    IS = "is",
    IS_NOT = "is not",
    GREATER_THAN = "greater than",
    LESS_THAN = "less than",
    GREATER_THAN_OR_EQUAL = "greater than or equal",
    LESS_THAN_OR_EQUAL = "less than or equal",
}

export enum SearchFilterComparatorDate {
    IS = "is",
    IS_NOT = "is not",
    GREATER_THAN = "greater than",
    LESS_THAN = "less than",
    GREATER_THAN_OR_EQUAL = "greater than or equal",
    LESS_THAN_OR_EQUAL = "less than or equal",
}

export enum SearchFilterComparatorBoolean {
    IS = "is",
    IS_NOT = "is not",
}

export enum SearchFilterType {
    STRING = "STRING",

    SELECT = "SELECT",
    MULTISELECT = "MULTISELECT",
    TYPEAHEAD = "TYPEAHEAD",

    NUMBER = "NUMBER",
    DATE = "DATE",
    BOOLEAN = "BOOLEAN",
}

export interface SearchFilter {
    type: SearchFilterType;
    key: string;
    comparator?: SearchFilterComparatorBoolean | SearchFilterComparatorDate | SearchFilterComparatorNumber | SearchFilterComparatorString;
}

export interface SearchFilterString extends SearchFilter {
    comparator: SearchFilterComparatorString;
    value: string;
}

export interface SearchFilterSelect extends SearchFilter {
    allowedValues: string[];
    comparator: SearchFilterComparatorString;
    value: string;
}

export interface SearchFilterMultiSelect extends SearchFilter {
    allowedValues: string[];
    comparator: SearchFilterComparatorString;
    value: string[];
}

export interface SearchFilterTypeahead extends SearchFilter {
    allowedValues: string[];
    comparator: SearchFilterComparatorString;
    value: string;
}

export interface SearchFilterNumber extends SearchFilter {
    comparator: SearchFilterComparatorNumber;
    value: number;
}

export interface SearchFilterDate extends SearchFilter {
    comparator: SearchFilterComparatorDate;
    value: number;
}

export interface SearchFilterBoolean extends SearchFilter {
    comparator: SearchFilterComparatorBoolean;
    value: boolean;
}

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC",
}

export interface Sorting {
    direction: SortDirection;
    fields?: string[];
}

export interface SearchParams {
    filters?: SearchFilter[];
    sorting?: Sorting;
    limit?: number;
    page?: number;
}
