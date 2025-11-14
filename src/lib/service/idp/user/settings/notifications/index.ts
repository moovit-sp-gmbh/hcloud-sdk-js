import Base, { MaybeRaw } from "../../../../../Base";
import { NotificationSettings, NotificationSettingsPatch } from "../../../../../interfaces/idp/user/NotificationSettings";

export class IdpNotifications extends Base {
    /**
     * Retrieves the notification settings of the requesting user.
     * @returns general settings of requesting user
     */
    async getNotificationSettingsOfUser<R extends boolean = false>(raw?: { raw: R }): Promise<MaybeRaw<R, NotificationSettings>> {
        const resp = await this.axios.get<NotificationSettings>(this.getEndpoint(`/v1/user/settings/notifications`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, NotificationSettings>;
    }

    /**
     * Updates the notification settings of the requesting user.
     * @param notificationSettingsPatch Object containing the new notification settings
     * @returns the updated notification settings
     */
    async patchNotificationSettings<R extends boolean = false>(
        notificationSettingsPatch: NotificationSettingsPatch,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, NotificationSettings>> {
        const resp = await this.axios.patch<NotificationSettings>(this.getEndpoint(`/v1/user/settings/notifications`), notificationSettingsPatch);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, NotificationSettings>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
