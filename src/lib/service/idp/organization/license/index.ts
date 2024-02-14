import Base from "../../../../Base";
import { License, LicenseTier } from "../../../../interfaces/idp/organization/license";

export class IdpOrganizationLicense extends Base {
    public getLicense = async (orgName: string): Promise<License> => {
        const res = await this.axios.get<License>(this.getEndpoint(`/org/${orgName}/license`));

        return res.data;
    };

    public updateLicense = async (orgName: string, tier: LicenseTier, uuid?: string): Promise<License> => {
        const res = await this.axios.put<License>(this.getEndpoint(`/org/${orgName}/license`), { tier, uuid });

        return res.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1${endpoint}`;
    }
}
