import Base from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { Message, RecipientType } from "../../../../interfaces/idp/user/Message";

export class IdpMessage extends Base {
    /**
     * Search all messages of the requesting user.
     * @returns Paginated response of Message objects
     */
    async searchMessages({ filters, sorting, limit = 100, page = 0 }: SearchParams): Promise<PaginatedResponse<Message>> {
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

        return createPaginatedResponse(resp) as PaginatedResponse<Message>;
    }

    /**
     * Retrieves a single message by ID.
     * @param messageId ID of the message
     * @returns The requested Message object
     */
    async getMessage(messageId: string): Promise<Message> {
        const resp = await this.axios.get<Message>(this.getEndpoint(`/v1/messages/${messageId}`));

        return resp.data;
    }

    /**
     * Mark message as read or unread.
     *
     * @param messageId ID of the Message object
     * @returns the updated Message object
     */
    async updateMessage(messageId: string, read: boolean): Promise<Message> {
        const resp = await this.axios.patch<Message>(this.getEndpoint(`/v1/messages/${messageId}/read`), { read });

        return resp.data;
    }

    /**
     * Deletes a message of the requesting User.
     * @param messageId Id of the Message
     */
    async deleteMessage(messageId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/messages/${messageId}`));
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
     *   - title - title of the message (max 255 characters)
     *   - subject - subject of the message (max 255 characters)
     *   - message - content of the message (max 5000 characters)
     * @returns the Message object
     */
    async sendMessage(msg: {
        to: string;
        recipient?: RecipientType;
        orgName?: string;
        title?: string;
        subject?: string;
        message: string;
    }): Promise<Message> {
        const res = await this.axios.post<Message>(this.getEndpoint(`/internal/v1/messages`), msg);

        return res.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
