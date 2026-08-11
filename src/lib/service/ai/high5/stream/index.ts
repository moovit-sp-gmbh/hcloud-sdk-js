import { AxiosInstance } from "axios";
import Base, { MaybeRaw, Options } from "../../../../Base";
import { AIHigh5StreamEvent, type AIHigh5StreamRequest, AIHigh5StreamResponse } from "../../../../interfaces/ai";
import { SortDirection } from "../../../../interfaces/global";

export class AIHigh5Stream extends Base {
    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);
    }

    /**
     * Get the message history of a High5 stream.
     *
     * @param organization Name of the Organization
     * @param space Name of the Space
     * @param streamId ID of the stream
     * @param page (optional) The page to retrieve
     * @param limit (optional) The maximum amount of streams that should be returned
     * @param direction (optional) Sort direction of the returned streams
     * @param raw (optional) If true, returns the raw Axios response
     * @returns Array of stream responses
     */
    async get<R extends boolean = false>(
        organization: string,
        space: string,
        streamId: string,
        page?: number,
        limit?: number,
        direction?: SortDirection,
        raw?: { raw: R }
    ): Promise<MaybeRaw<R, AIHigh5StreamResponse[]>> {
        const resp = await this.axios.get<AIHigh5StreamResponse[]>(
            this.getEndpoint(`/v1/high5/org/${organization}/spaces/${space}/streams/${streamId}`),
            {
                params: { limit, page, direction },
            }
        );

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, AIHigh5StreamResponse[]>;
    }

    /**
     * Send a message to a High5 stream and receive the response as a stream of Server-Sent Events.
     *
     * @param organization Name of the Organization
     * @param space Name of the Space
     * @param streamId ID of the stream
     * @param request The message request to send
     * @param onMessage Callback invoked for each event received from the stream
     */
    async post(
        organization: string,
        space: string,
        streamId: string,
        request: AIHigh5StreamRequest,
        onMessage: (event: AIHigh5StreamEvent) => void
    ): Promise<void> {
        const resp = await this.axios.post<ReadableStream<Uint8Array>>(
            this.getEndpoint(`/v1/high5/org/${organization}/spaces/${space}/streams/${streamId}`),
            request,
            {
                responseType: "stream",
                adapter: "fetch",
                headers: {
                    Accept: "text/event-stream",
                },
            }
        );

        const reader = resp.data.getReader();
        const decoder = new TextDecoder();

        let buffer = "";
        let response: AIHigh5StreamResponse | undefined;

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            buffer += decoder.decode(value, { stream: true });

            const events = buffer.split(/\r?\n\r?\n/);
            buffer = events.pop() ?? "";

            for (const event of events) {
                const data = event.split(/\r?\n/).find(line => line.startsWith("data:"));

                if (!data) {
                    continue;
                }

                const parsed = JSON.parse(data.slice("data:".length).trim()) as AIHigh5StreamEvent;

                switch (parsed.type) {
                    case "start":
                        response = parsed.response;
                        onMessage({ type: "start", response });
                        break;

                    case "chunk":
                        if (!response) {
                            throw new Error("Received chunk before start");
                        }

                        response.message += parsed.message;
                        onMessage({ type: "chunk", message: parsed.message });
                        break;

                    case "done":
                        if (!response) {
                            throw new Error("Received done before start");
                        }

                        onMessage({ type: "done", response });
                        return;

                    case "error":
                        throw new Error(parsed.message);
                    default:
                        throw new Error("Unknown event type");
                }
            }
        }
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/ai${endpoint}`;
    }
}
