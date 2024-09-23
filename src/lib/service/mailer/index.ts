import Base from "../../Base";
import { Version } from "../../interfaces/global";
import MailerInternal from "./internal";

export default class Mailer extends Base {
    public get internal(): MailerInternal {
        if (this._internal === undefined) {
            this._internal = new MailerInternal(this.options, this.axios);
        }
        return this._internal;
    }
    private _internal?: MailerInternal;

    /**
     * Requests the endpoint version
     * @returns Version object
     */
    async version(): Promise<Version> {
        const resp = await this.axios.get<Version>(this.getEndpoint("/v1/version"), {});

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/mailer${endpoint}`;
    }
}
