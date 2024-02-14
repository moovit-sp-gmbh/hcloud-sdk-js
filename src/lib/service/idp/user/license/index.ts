import Base from "../../../../Base";
import { License, LicenseTier } from "../../../../interfaces/idp/organization/license";

export class IdpUserLicense extends Base {
    public getLicense = async (): Promise<License> => {
        const res = await this.axios.get<License>(this.getEndpoint(`/user/license`));

        return res.data;
    };

    public updateLicense = async (tier: LicenseTier, uuid?: string): Promise<License> => {
        const res = await this.axios.put<License>(this.getEndpoint(`/user/license`), { tier, uuid });

        return res.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1${endpoint}`;
    }
}
