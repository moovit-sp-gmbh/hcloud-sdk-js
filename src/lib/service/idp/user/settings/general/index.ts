import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { GeneralSettings, GeneralSettingsPatch } from "../../../../../interfaces/idp/user/GeneralSettings";

export class IdpGeneral extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves the current active user settings.
     * @returns the current active user settings
     */
    public getGeneralSettings = async (): Promise<GeneralSettings> => {
        const resp = await this.axios.get<GeneralSettings>(this.getEndpoint(`/v1/user/settings/general`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * Changes the user settings.
     * @param generalSettingsPatch Object containing the new user settings
     * @returns the updated user settings
     */
    public patchGeneralSettings = async (generalSettingsPatch: GeneralSettingsPatch): Promise<GeneralSettings> => {
        const resp = await this.axios
            .patch<GeneralSettings>(this.getEndpoint(`/v1/user/settings/general`), generalSettingsPatch)
            .catch((err: Error) => {
                throw err;
            });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
