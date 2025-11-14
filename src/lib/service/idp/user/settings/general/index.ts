import Base, { MaybeRaw } from "../../../../../Base";
import { GeneralSettings, GeneralSettingsLastVisitPatch, GeneralSettingsPatch } from "../../../../../interfaces/idp/user/GeneralSettings";

export class IdpGeneral extends Base {
    /**
     * Retrieves the current active user settings.
     * @returns the current active user settings
     */
    async getGeneralSettings<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, GeneralSettings>> {
        const resp = await this.axios.get<GeneralSettings>(this.getEndpoint(`/v1/user/settings/general`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, GeneralSettings>;
    }

    /**
     * Changes the user settings.
     * @param generalSettingsPatch Object containing the new user settings
     * @returns the updated user settings
     */
    async patchGeneralSettings<R extends boolean = false>(
        generalSettingsPatch: GeneralSettingsPatch,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, GeneralSettings>> {
        const resp = await this.axios.patch<GeneralSettings>(this.getEndpoint(`/v1/user/settings/general`), generalSettingsPatch);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, GeneralSettings>;
    }

    /**
     * Changes the user last visit settings.
     * @param generalSettingsLastVisitPatch Object containing the new user settings in case of lastView and lastURL
     * @returns the updated user settings
     */
    async patchGeneralSettingsLastVisit<R extends boolean = false>(
        generalSettingsLastVisitPatch: GeneralSettingsLastVisitPatch,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, GeneralSettings>> {
        const resp = await this.axios.patch<GeneralSettings>(this.getEndpoint(`/v1/user/settings/general/lastVisit`), generalSettingsLastVisitPatch);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, GeneralSettings>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
