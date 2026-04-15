import { ReducedSpace } from "../../../global";
import { ReducedOrganization } from "../../../idp/organization";
import { ReducedUser } from "../../../idp/user";
import { ReducedEvent } from "../event";

enum IntervalType {
    MINUTE = "minute",
    HOUR = "hour",
    DAY = "day",
    MONTH = "month",
    YEAR = "year",
    CUSTOM = "custom",
}

interface MinuteCronjob {
    type: IntervalType.MINUTE;
    values: {
        minute: number;
    };
}

interface HourCronjob {
    type: IntervalType.HOUR;
    values: {
        hour: number;
    };
}

interface DayCronjob {
    type: IntervalType.DAY;
    values: {
        hour: number;
        minute: number;
    };
}

interface MonthCronjob {
    type: IntervalType.MONTH;
    values: {
        day: number;
        hour: number;
        minute: number;
    };
}

interface YearCronjob {
    type: IntervalType.YEAR;
    values: {
        month: number;
        day: number;
        hour: number;
        minute: number;
    };
}

interface CustomCronjob {
    type: IntervalType.CUSTOM;
    values: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
    };
}

type CronjobType = MinuteCronjob | HourCronjob | DayCronjob | MonthCronjob | YearCronjob | CustomCronjob;

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
    "name" | "expression" | "payload" | "target" | "enabled" | "description" | "lastStatus" | "lastTriggered" | "time"
> & {
    targetEvent: string;
};
