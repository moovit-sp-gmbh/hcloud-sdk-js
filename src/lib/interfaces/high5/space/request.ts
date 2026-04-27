import { IncomingHttpHeaders } from "http";
import { HttpMethod } from "../../global";

export interface CapturedRequest {
    method: HttpMethod;
    headers: IncomingHttpHeaders;
    body: any;
    spaceId: string;
    organizationId: string;
    creatorId: string;
}
