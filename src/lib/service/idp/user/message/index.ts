import Base, { MaybeRaw } from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { Message, MessageLevel, MessageSource, MessageType, RecipientType } from "../../../../interfaces/idp/user/Message";

export class IdpMessage extends Base {
    /**
     * Search all messages of the requesting user.
     * @returns Paginated response of Message objects
     */
    async searchMessages<R extends boolean = false>(
        { filters, sorting, limit = 100, page = 0 }: SearchParams,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, PaginatedResponse<Message>>> {
        const filtersDTO = filters?.map((f: SearchFilter) => {
            return new SearchFilterDTO(f);
        });

        const resp = await this.axios.post<Message[]>(
            this.getEndpoint(`/v1/messages/search`),
            {
                filters: filtersDTO,
                sorting,
            },
            {
                params: { limit, page },
            }
        );

        return (raw?.raw ? { ...resp, data: createPaginatedResponse(resp) } : createPaginatedResponse(resp)) as MaybeRaw<
            R,
            PaginatedResponse<Message>
        >;
    }

    /**
     * Retrieves a single message by ID.
     * @param messageId ID of the message
     * @returns The requested Message object
     */
    async getMessage<R extends boolean = false>(messageId: string, raw?: { raw: R }): Promise<MaybeRaw<R, Message>> {
        const resp = await this.axios.get<Message>(this.getEndpoint(`/v1/messages/${messageId}`));

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Message>;
    }

    /**
     * Mark message as read or unread.
     *
     * @param messageId ID of the Message object
     * @returns the updated Message object
     */
    async updateMessage<R extends boolean = false>(messageId: string, read: boolean, raw?: { raw: R }): Promise<MaybeRaw<R, Message>> {
        const resp = await this.axios.patch<Message>(this.getEndpoint(`/v1/messages/${messageId}/read`), { read });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Message>;
    }

    /**
     * Bulk-update the read status of multiple messages by ID.
     *
     * @param ids IDs of the messages to update
     * @param read Read status to apply to all specified messages
     * @returns The number of messages that were modified
     */
    async bulkReadMessages<R extends boolean = false>(
        ids: string[],
        read: boolean,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, { modifiedCount: number }>> {
        const resp = await this.axios.patch<{ modifiedCount: number }>(this.getEndpoint(`/v1/messages/bulk-read`), { ids, read });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, { modifiedCount: number }>;
    }

    /**
     * Set the soft-delete state of a received message.
     *
     * @param messageId ID of the Message object
     * @param deleted Whether the message should be soft-deleted (true) or restored (false)
     * @returns the updated Message object
     */
    async softDeleteMessage<R extends boolean = false>(messageId: string, deleted: boolean, raw?: { raw: R }): Promise<MaybeRaw<R, Message>> {
        const resp = await this.axios.patch<Message>(this.getEndpoint(`/v1/messages/${messageId}/deleted`), { deleted });

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Message>;
    }

    /**
     * Deletes a message of the requesting User.
     * @param messageId Id of the Message
     */
    async deleteMessage<R extends boolean = false>(messageId: string, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/messages/${messageId}`));
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Send message to single user or all users of organization or team.
     *
     * This is an internal endpoint.
     *
     * @param msg Message to send
     *   - to - should be email, orgName or teamName
     *   - recipient - enum type USER, ORGANIZATION or TEAM (by default is USER)
     *   - orgName - should be only specified if recipient===TEAM
     *   - source - the system or service that originated this message
     *   - type - the specific type of message, scoped to its source
     *   - properties - payload specific to the message source and type
     *   - level - severity level of the message (defaults to "info")
     *   - group - optional UUID to group related messages
     * @returns the Message object
     */
    async sendMessage<R extends boolean = false>(
        msg: {
            to: string;
            recipient?: RecipientType;
            orgName?: string;
            source: MessageSource;
            type: MessageType;
            properties: Record<string, unknown>;
            level?: MessageLevel;
            group?: string;
        },
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Message>> {
        const res = await this.axios.post<Message>(this.getEndpoint(`/internal/v1/messages`), msg);

        return (raw?.raw ? res : res.data) as MaybeRaw<R, Message>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
