import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { Version } from "../../interfaces/global";
import MailerInternal from "./MailerInternal";

export default class Mailer extends base {
    public internal: MailerInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.internal = new MailerInternal(this.options, this.axios);
    }

    /**
     * Version requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/mailer${endpoint}`;
    }
}
