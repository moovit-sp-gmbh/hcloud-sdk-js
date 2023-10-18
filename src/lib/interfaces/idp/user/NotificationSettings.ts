import { ReducedUser } from ".";

export interface NotificationSettings {
    _id: string;
    user: ReducedUser;
    organizationInvitationEmail: boolean;
    systemNotifications: boolean;
}

export type NotificationSettingsPatch = Partial<Omit<NotificationSettings, "_id" | "user">>;
