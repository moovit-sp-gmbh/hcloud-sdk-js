import { AxiosInstance } from "axios";
import base, { Options } from "../../../../base";
import { GeneralSettings, GeneralSettingsPatch } from "../../../../interfaces/idp/user/GeneralSettings";

export class IdpGeneral extends base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * getGeneralSettings requests the current active user settings
     * @returns the current active user settings
     */
    public getGeneralSettings = async (): Promise<GeneralSettings> => {
        const resp = await this.axios.get<GeneralSettings>(this.getEndpoint(`/v1/user/settings/general`)).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * patchGeneralSettings change the user settings
     * @param patId the id of the pat object
     * @returns the updated pat object
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
