import Base from "../../../../Base";
import { createPaginatedResponse } from "../../../../helper/paginatedResponseHelper";
import { SearchFilterDTO } from "../../../../helper/searchFilter";
import { PaginatedResponse, SearchFilter, SearchParams } from "../../../../interfaces/global";
import { Message } from "../../../../interfaces/idp/user/Message";

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

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/account${endpoint}`;
    }
}
