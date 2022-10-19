import base, { Options } from "../../base";
import axios from "axios";
import { HtmlMail, MustacheMail, TemplateMail } from "../../interfaces/Mail";

export default class MailerInternal extends base {
    /**
     * sendMailMustache sends a new mail based on a mustache html body
     *
     * THIS ENDPOINT WORKS INTERNALLY ONLY
     *
     * CAN ONLY BE USED FROM BACKENDS WITHIN THE hcloud DEPLOYMENT AS THE ENDPOINT IS NOT PUBLICLY EXPOSED
     * @param mail TemplateMail
     */
    sendMailMustache = async (mail: MustacheMail): Promise<void> => {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/mustache"), mail).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * sendMailHtml sends a new mail based on a html body
     *
     * THIS ENDPOINT WORKS INTERNALLY ONLY
     *
     * CAN ONLY BE USED FROM BACKENDS WITHIN THE hcloud DEPLOYMENT AS THE ENDPOINT IS NOT PUBLICLY EXPOSED
     * @param mail TemplateMail
     */
    sendMailHtml = async (mail: HtmlMail): Promise<void> => {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/html"), mail).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * sendMailTemplate sends a new mail based on an existing template
     *
     * THIS ENDPOINT WORKS INTERNALLY ONLY
     *
     * CAN ONLY BE USED FROM BACKENDS WITHIN THE hcloud DEPLOYMENT AS THE ENDPOINT IS NOT PUBLICLY EXPOSED
     * @param mail TemplateMail
     */
    sendMailTemplate = async (mail: TemplateMail): Promise<void> => {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/template"), mail).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.opts.api}/api/mailer/internal${endpoint}`;
    }
}
