import Base, { MaybeRaw } from "../../../Base";
import { High5SpaceInternal } from "./space";

export class High5Internal extends Base {
    public get space(): High5SpaceInternal {
        if (this._space === undefined) {
            this._space = new High5SpaceInternal(this.options, this.axios);
        }
        return this._space;
    }
    private _space?: High5SpaceInternal;

    async deleteUsers<R extends boolean = false>(userIds: string[], raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint("/v1/users"), { data: { userIds } });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    async deleteDatabasesOfOrganization<R extends boolean = false>(orgId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`/v1/org/${orgId}/databases`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    async deleteDocumentsOfOrganization<R extends boolean = false>(orgId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`/v1/org/${orgId}/documents`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    async deleteJoinTokensOfOrganization<R extends boolean = false>(orgName: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`/v1/org/${orgName}/join/token`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    async deleteStatsOfOrganization<R extends boolean = false>(orgId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete(this.getEndpoint(`/v1/org/${orgId}/stats`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/high5/internal${endpoint}`;
    }
}
