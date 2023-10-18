import { AxiosInstance } from "axios";
import Base, { Options } from "../../../../../Base";
import { NotificationSettings, NotificationSettingsPatch } from "../../../../../interfaces/idp/user/NotificationSettings";

export class IdpNotifications extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Retrieves the notification settings of the requesting user.
     * @returns general settings of requesting user
     */
    public getNotificationSettingsOfUser = async (): Promise<NotificationSettings> => {
        const resp = await this.axios.get<NotificationSettings>(this.getEndpoint(`/v1/user/settings/notifications`));

        return resp.data;
    };

    /**
     * Updates the notification settings of the requesting user.
     * @param notificationSettingsPatch Object containing the new notification settings
     * @returns the updated notification settings
     */
    public patchNotificationSettings = async (notificationSettingsPatch: NotificationSettingsPatch): Promise<NotificationSettings> => {
        const resp = await this.axios.patch<NotificationSettings>(this.getEndpoint(`/v1/user/settings/notifications`), notificationSettingsPatch);

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
