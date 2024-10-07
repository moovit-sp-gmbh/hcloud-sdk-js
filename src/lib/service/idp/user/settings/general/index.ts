import Base from "../../../../../Base";
import { GeneralSettings, GeneralSettingsLastVisitPatch, GeneralSettingsPatch } from "../../../../../interfaces/idp/user/GeneralSettings";

export class IdpGeneral extends Base {
    /**
     * Retrieves the current active user settings.
     * @returns the current active user settings
     */
    async getGeneralSettings(): Promise<GeneralSettings> {
        const resp = await this.axios.get<GeneralSettings>(this.getEndpoint(`/v1/user/settings/general`));

        return resp.data;
    }

    /**
     * Changes the user settings.
     * @param generalSettingsPatch Object containing the new user settings
     * @returns the updated user settings
     */
    async patchGeneralSettings(generalSettingsPatch: GeneralSettingsPatch): Promise<GeneralSettings> {
        const resp = await this.axios.patch<GeneralSettings>(this.getEndpoint(`/v1/user/settings/general`), generalSettingsPatch);

        return resp.data;
    }

    /**
     * Changes the user last visit settings.
     * @param generalSettingsLastVisitPatch Object containing the new user settings in case of lastView and lastURL
     * @returns the updated user settings
     */
    async patchGeneralSettingsLastVisit(generalSettingsLastVisitPatch: GeneralSettingsLastVisitPatch): Promise<GeneralSettings> {
        const resp = await this.axios.patch<GeneralSettings>(this.getEndpoint(`/v1/user/settings/general/lastVisit`), generalSettingsLastVisitPatch);

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
