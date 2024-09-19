import Base from "../../../../Base";
import { License } from "../../../../interfaces/idp/organization/license";

export class IdpUserLicense extends Base {
    async getLicense(): Promise<License> {
        const res = await this.axios.get<License>(this.getEndpoint(`/user/license`));

        return res.data;
    }

    async updateLicense(token: string): Promise<License> {
        const res = await this.axios.put<License>(this.getEndpoint(`/user/license`), { identifier: token });

        return res.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1${endpoint}`;
    }
}
