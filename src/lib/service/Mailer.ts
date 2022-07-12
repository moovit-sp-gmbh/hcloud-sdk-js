import base, { Options } from "../base";
import axios from "axios";
import { AuditLog } from "../interfaces/Auditor";
import { Version } from "../interfaces/Global";
import MailerInternal from "./MailerInternal";

export default class Mailer extends base {
    public interal: MailerInternal;

    constructor(opts: Options) {
        super(opts);

        this.interal = new MailerInternal(opts);
    }

    /**
     * Version requests the endpoint version
     * @returns Version object
     */
    version = async (): Promise<Version> => {
        const resp = await axios.get<Version>(this.getEndpoint("/v1/version"), {}).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    private getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/mailer${endpoint}`;
    }
}
