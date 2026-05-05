import { ReducedSpace } from "../../../global";
import { ReducedOrganization } from "../../../idp/organization";
import { ReducedUser } from "../../../idp/user";
import { ReducedEvent } from "../event";

export enum IntervalType {
    MINUTE = "minute",
    HOUR = "hour",
    DAY = "day",
    MONTH = "month",
    YEAR = "year",
    CUSTOM = "custom",
}

export interface MinuteCronjob {
    type: IntervalType.MINUTE;
    values: {
        minute: number;
    };
}

export interface HourCronjob {
    type: IntervalType.HOUR;
    values: {
        hour: number;
    };
}

export interface DayCronjob {
    type: IntervalType.DAY;
    values: {
        hour: number;
        minute: number;
    };
}

export interface MonthCronjob {
    type: IntervalType.MONTH;
    values: {
        day: number;
        hour: number;
        minute: number;
    };
}

export interface YearCronjob {
    type: IntervalType.YEAR;
    values: {
        month: number;
        day: number;
        hour: number;
        minute: number;
    };
}

export interface CustomCronjob {
    type: IntervalType.CUSTOM;
    values: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
    };
}

export type CronjobType = MinuteCronjob | HourCronjob | DayCronjob | MonthCronjob | YearCronjob | CustomCronjob;

export interface Job {
    _id: string;
    name: string;
    expression: string;
    targetEvent: ReducedEvent;
    space: ReducedSpace;
    organization: ReducedOrganization;
    creator: ReducedUser;
    timezone: string;
    description?: string;
    payload?: string;
    enabled?: boolean;
    target: string;
    createDate: number;
    modifyDate: number;
    nextExecution?: number[];
    lastStatus?: number;
    lastTriggered?: number;
    time?: CronjobType;
}

export type JobCreate = Pick<
    Job,
    "name" | "expression" | "timezone" | "payload" | "enabled" | "description" | "target" | "lastStatus" | "lastTriggered" | "time"
> & {
    targetEvent: string;
};
