import base, { Options } from "../../base";
import { AxiosInstance } from "axios";
import { AuditLog } from "../../interfaces/Auditor";
import { Version } from "../../interfaces/Global";
import MailerInternal from "./MailerInternal";

export default class Mailer extends base {
    public interal: MailerInternal;

    constructor(options: Options, axios: AxiosInstance) {
        super(options, axios);

        this.interal = new MailerInternal(this.options, this.axios);
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
        return `${this.options.api}/api/mailer${endpoint}`;
    }
}
