import Base, { MaybeRaw } from "../../../Base";
import { Comment, CommentSortDirection, CommentSortField, CreateComment, EditComment, Reply } from "../../../interfaces/cosmo/comment";
import { SearchFilter, Sorting } from "../../../interfaces/global";

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
     * @param limit Maximum number of comments to return, user -1 for no limit
     * @param page Page number for pagination
     * @param annotation Whether to include annotations in the response
     * @param replySample Amount of replies to load
     * @param sortField Field to sort comments by
     * @param sortDirection Sort direction for comments
     * @param accept The Accept header value, either "application/json" (comments response as json)
     *                  or "application/mediacomposer+xml" (comments response as media composer xml as download)
     *                  or "application/fcp+xml" (comments response as fcp xml as download => i.e. for Adobe Premiere Pro)
     *                  or "text/edl" (comments response as edl as download => i.e. for Davinci Resolve)
     * @returns A list of Comments
     */
    async listComments<R extends boolean = false, A extends string = "application/json">(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        refId: string,
        limit?: number,
        page?: number,
        annotation: boolean = false,
        replySample: number = 0,
        sortField?: CommentSortField,
        sortDirection?: CommentSortDirection,
        accept?: A,
        raw?: { raw: R }
    ): Promise<A extends "application/mediacomposer+xml" | "application/fcp+xml" | "text/edl" ? ArrayBuffer : MaybeRaw<R, Comment[]>> {
        limit = limit ?? 100;
        page = page ?? 0;

        const fileDownloadTypes = new Set<string>(["application/mediacomposer+xml", "application/fcp+xml", "text/edl"]);
        const isFileDownload = accept !== undefined && fileDownloadTypes.has(accept);

        const resp = await this.axios.get(
            this.getEndpoint(
                `/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments?limit=${limit}&page=${page}&annotation=${annotation}&refId=${refId}&replySample=${replySample}${sortField !== undefined ? `&sort_field=${sortField}` : ""}${sortDirection !== undefined ? `&sort_direction=${sortDirection}` : ""}`
            ),
            {
                headers: {
                    Accept: accept ?? "application/json",
                },
                ...(isFileDownload && { responseType: "arraybuffer" }),
            }
        );

        if (isFileDownload) {
            return resp.data as any;
        }

        return (raw?.raw ? resp : resp.data) as any;
    }

    /**
     * Search Comments referring to a specific entity, applying filters and sorting.
     * @remarks
     * ** Under development, breaking changes possible**
     *
     * The total number of matching Comments (independent of `limit` and `page`) is returned in the `total`
     * response header. Pass `{ raw: true }` to access it via `resp.headers["total"]` for pagination.
     * @param orgName Name of the Organization
     * @param spaceName Name of the Space
     * @param namespaceName Name of the Namespace
     * @param refId ID of the entity the Comments refer to
     * @param search Search criteria including optional sorting and filters
     * @param limit Maximum number of Comments to return (1-100; defaults to 25)
     * @param page Page number to skip the first (page * limit) results (defaults to 0)
     * @param annotation Whether to include annotations in the response
     * @returns The page of matching Comments
     */
    async searchComments<R extends boolean = false>(
        orgName: string,
        spaceName: string,
        namespaceName: string,
        refId: string,
        search: { sorting?: Sorting; filters?: SearchFilter[] },
        limit?: number,
        page?: number,
        annotation: boolean = false,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, Comment[]>> {
        limit = limit ?? 25;
        page = page ?? 0;

        const resp = await this.axios.post<Comment[]>(
            this.getEndpoint(`/v1/org/${orgName}/spaces/${spaceName}/namespaces/${namespaceName}/comments/search`),
            search,
            {
                params: {
                    refId,
                    limit,
                    page,
                    annotation,
                },
            }
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
