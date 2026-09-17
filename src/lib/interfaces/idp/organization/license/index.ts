import { ReducedUser } from "../../user";

export type License = {
    tier: LicenseTier;
    type: LicenseType;
    billingId?: string;
    quota: LicenseQuota;
    creator?: ReducedUser;
    contact?: ReducedUser;
    expireDate: number;
    createDate: number;
};

type LicenseQuotaBase = {
    idp: {
        organization: {
            members: {
                quota: number;
            };
            agents: {
                quota: number;
            };
            teams: {
                quota: number;
            };
            domains: {
                quota: number;
            };
            logPeriodInDays: number;
        };
    };
};

type High5SpacesQuota = {
    quota: number;
    catalogs: {
        quota: number;
    };
    customCatalogs: {
        quota: number;
    };
    customNodes: {
        quota: number;
    };
    webhooks: {
        quota: number;
        logs: {
            quota: number;
        };
    };
    secrets: {
        quota: number;
    };
    events: {
        quota: number;
        streams: {
            quota: number;
        };
    };
    databases: {
        quota: number;
        documents: {
            quota: number;
        };
    };
};

type High5CommonQuota = {
    executionsPerMonth: {
        quota: number;
    };
    executionLogPeriodInDays: {
        quota: number;
    };
    executionLogMaxLimit: {
        quota: number;
    };
};

type CronjobQuota = {
    quota: number;
    logs: {
        quota: number;
    };
};

/** Current shape: cronjob quota lives under high5, post Fuse-to-High5 merge. */
type LicenseQuotaHigh5Jobs = LicenseQuotaBase & {
    high5: High5CommonQuota & {
        spaces: High5SpacesQuota & {
            jobs: CronjobQuota;
        };
        secondBaseExecutions: boolean;
    };
    fuse?: never;
};

/** Legacy shape: cronjob quota still lives under the (now removed) fuse product. Present only on licenses issued before the Fuse-to-High5 merge. */
type LicenseQuotaFuseJobs = LicenseQuotaBase & {
    high5: High5CommonQuota & {
        spaces: High5SpacesQuota;
    };
    fuse: {
        spaces: {
            quota: number;
            jobs: CronjobQuota;
        };
        secondBaseExecutions: boolean;
    };
};

export type LicenseQuota = LicenseQuotaHigh5Jobs | LicenseQuotaFuseJobs;

export enum LicenseTier {
    FREE = "FREE",
    PRO = "PRO",
    ENTERPRISE = "ENTERPRISE",
}

export enum LicenseType {
    PRODUCTION = "PRODUCTION",
    POC = "POC",
    THIRD_PARTY = "THIRD_PARTY",
}
