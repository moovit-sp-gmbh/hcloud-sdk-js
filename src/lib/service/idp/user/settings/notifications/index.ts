import Base from "../../../../../Base";
import { NotificationSettings, NotificationSettingsPatch } from "../../../../../interfaces/idp/user/NotificationSettings";

export class IdpNotifications extends Base {
    /**
     * Retrieves the notification settings of the requesting user.
     * @returns general settings of requesting user
     */
    async getNotificationSettingsOfUser(): Promise<NotificationSettings> {
        const resp = await this.axios.get<NotificationSettings>(this.getEndpoint(`/v1/user/settings/notifications`));

        return resp.data;
    }

    /**
     * Updates the notification settings of the requesting user.
     * @param notificationSettingsPatch Object containing the new notification settings
     * @returns the updated notification settings
     */
    async patchNotificationSettings(notificationSettingsPatch: NotificationSettingsPatch): Promise<NotificationSettings> {
        const resp = await this.axios.patch<NotificationSettings>(this.getEndpoint(`/v1/user/settings/notifications`), notificationSettingsPatch);

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
