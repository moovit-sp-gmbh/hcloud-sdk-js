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

export type LicenseQuota = {
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
    high5: {
        spaces: {
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
        };
        executionsPerMonth: {
            quota: number;
        };
    };
    fuse: {
        spaces: {
            quota: number;
            jobs: {
                quota: number;
                logs: {
                    quota: number;
                };
            };
        };
        secondBaseExecutions: boolean;
    };
};

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
