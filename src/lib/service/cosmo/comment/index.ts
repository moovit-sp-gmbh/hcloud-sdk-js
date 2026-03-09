import Base, { MaybeRaw } from "../../../Base";
import { Comment, CreateComment, EditComment, Reply } from "../../../interfaces/cosmo/comment";

/**
 * @class Comment
 * @extends Base
 *
 * @remarks
 * **Under development, breaking changes possible**
 *
 * Represents a Comment resource in Cosmo, providing methods to interact with the Comment API.
 */
export class CosmoComment extends Base {
    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/cosmo${endpoint}`;
    }

    /**
     * Create a new Comment in the specified Organization, Space and Namespace for a specific Asset Reference.
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param comment Content of the Comment to create
     * @param annotation Whether to include annotations in the response
     * @returns The created Comment
     */
    async createComment<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        comment: CreateComment,
        annotation: boolean = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Comment | Reply>> {
        const resp = await this.axios.post<Comment | Reply>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments?annotation=${annotation}`),
            comment
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Comment | Reply>;
    }

    /**
     * List Comments
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param limit Maximum number of comments to return
     * @param page Page number for pagination
     * @param annotation Whether to include annotations in the response
     * @param replySample Amount of replies to load
     *
     * @returns A list of Comments
     */
    async listComments<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        refId: string,
        limit?: number,
        page?: number,
        annotation: boolean = false,
        replySample: number = 0,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Comment[]>> {
        limit = limit ?? 100;
        page = page ?? 0;
        const resp = await this.axios.get<Comment[]>(
            this.getEndpoint(
                `/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments?limit=${limit}&page=${page}&annotation=${annotation}&refId=${refId}&replySample=${replySample}`
            )
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Comment[]>;
    }

    /**
     * Edit a Comment
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param commentId ID of the Comment to edit
     * @param editComment Content of the Comment to edit
     * @param annotation Whether to include annotations in the response
     *
     * @returns The edited Comment
     */
    async editComment<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        commentId: string,
        editComment: EditComment,
        annotation: boolean = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Comment | Reply>> {
        const resp = await this.axios.patch<Comment>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments/${commentId}?annotation=${annotation}`),
            editComment
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Comment | Reply>;
    }

    /**
     * Get a single Comment by ID
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param commentId ID of the Comment to edit
     * @param annotation Whether to include annotations in the response
     *
     * @returns The requested Comment
     */
    async getComment<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        commentId: string,
        annotation: boolean = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Comment | Reply>> {
        const resp = await this.axios.get<Comment>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments/${commentId}?annotation=${annotation}`)
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, Comment | Reply>;
    }

    /**
     * Delete Comments by ID
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param commentIds IDs of the Comments to delete
     *
     * @returns 204 No Content on success
     */
    async deleteComment<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        commentIds: string[],
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments`), {
            data: { commentIds },
        });
        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

}
