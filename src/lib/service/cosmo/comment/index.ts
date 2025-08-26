import Base from "../../../Base";
import { Comment, CreateComment, EditComment } from "../../../interfaces/cosmo/comment";

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
    async createComment(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        comment: CreateComment,
        annotation: boolean = false
    ): Promise<Comment> {
        const resp = await this.axios.post<Comment>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments?annotation=${annotation}`),
            comment
        );

        return resp.data;
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
     *
     * @returns A list of Comments
     */
    async listComments(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        refId: string,
        limit?: number,
        page?: number,
        annotation: boolean = false
    ): Promise<Comment[]> {
        limit = limit ?? 100;
        page = page ?? 0;
        const resp = await this.axios.get<Comment[]>(
            this.getEndpoint(
                `/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments?limit=${limit}&page=${page}&annotation=${annotation}&refId=${refId}`
            )
        );

        return resp.data;
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
    async editComment(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        commentId: string,
        editComment: EditComment,
        annotation: boolean = false
    ): Promise<Comment> {
        const resp = await this.axios.patch<Comment>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments/${commentId}?annotation=${annotation}`),
            editComment
        );

        return resp.data;
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
    async getComment(orgName: string, spaceName: string, namespaceName: string, commentId: string, annotation: boolean = false): Promise<Comment> {
        const resp = await this.axios.get<Comment>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments/${commentId}?annotation=${annotation}`)
        );

        return resp.data;
    }

    /**
     * Delete a Comment by ID
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param commentId ID of the Comment to edit
     *
     * @returns 204 No Content on success
     */
    async deleteComment(orgName: string, spaceName: string, namespaceName: string, commentId: string): Promise<void> {
        await this.axios.delete<void>(this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments/${commentId}`));
    }

    /**
     * Edit a Comments text
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param commentId ID of the Comment to edit
     * @param text New text for the Comment
     * @param annotation Whether to include annotations in the response
     *
     * @returns The edited Comment
     */
    async editCommentText(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        commentId: string,
        text: string,
        annotation: boolean = false
    ): Promise<Comment> {
        const resp = await this.axios.patch<Comment>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments/${commentId}?annotation=${annotation}`),
            { text: text }
        );

        return resp.data;
    }

    /**
     * Edit a Comments annotation
     * @remarks
     * ** Under development, breaking changes possible**
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param commentId ID of the Comment to edit
     * @param newAnnotationContent New annotation for the Comment
     * @param annotation Whether to include annotations in the response
     *
     * @returns The edited Comment
     */
    async editCommentAnnotation(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        commentId: string,
        newAnnotationContent: string,
        annotation: boolean = false
    ): Promise<Comment> {
        const resp = await this.axios.patch<Comment>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments/${commentId}?annotation=${annotation}`),
            { annotation: newAnnotationContent }
        );

        return resp.data;
    }
}
