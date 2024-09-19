import Base from "../../../../Base";
import { License } from "../../../../interfaces/idp/organization/license";

export class IdpOrganizationLicense extends Base {
    async getLicense(orgName: string): Promise<License> {
        const res = await this.axios.get<License>(this.getEndpoint(`/org/${orgName}/license`));

        return res.data;
    }

    async updateLicense(orgName: string, token: string): Promise<License> {
        const res = await this.axios.put<License>(this.getEndpoint(`/org/${orgName}/license`), { identifier: token });

        return res.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1${endpoint}`;
    }
}
