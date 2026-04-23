import { IncomingHttpHeaders } from "http";
import { HttpMethod } from "../../global";

export interface CapturedRequest {
    _id: string;
    method: HttpMethod;
    headers: IncomingHttpHeaders;
    body: any;
    spaceId: string;
    organizationId: string;
    creatorId: string;
    createDate: number;
}
