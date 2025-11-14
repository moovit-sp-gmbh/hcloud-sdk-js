import Base, { MaybeRaw } from "../../../../Base";
import { License } from "../../../../interfaces/idp/organization/license";

export class IdpUserLicense extends Base {
    async getLicense<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, License>> {
        const res = await this.axios.get<License>(this.getEndpoint(`/user/license`));

        return (raw?.raw ? res : res.data) as MaybeRaw<R, License>;
    }

    async updateLicense<R extends boolean = false>(token: string, raw?: { raw: R }): Promise<MaybeRaw<R, License>> {
        const res = await this.axios.put<License>(this.getEndpoint(`/user/license`), { identifier: token });

        return (raw?.raw ? res : res.data) as MaybeRaw<R, License>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account/v1${endpoint}`;
    }
}
