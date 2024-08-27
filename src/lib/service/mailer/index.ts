import { AxiosInstance } from "axios";
import Base, { Options } from "../../Base";
import { Version } from "../../interfaces/global";
import MailerInternal from "./internal";

export default class Mailer extends Base {
    public internal: MailerInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.internal = new MailerInternal(this.options, this.axios);
    }

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {});

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/mailer${endpoint}`;
    }
}
