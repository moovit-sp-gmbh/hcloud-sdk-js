import base from "../../base";
import { HtmlMail, MailjetMailDTO, MustacheMail, TemplateMail } from "../../interfaces/Mail";

export default class MailerInternal extends base {
    /**
     * sendMailMailjet sends a new mail based on a mailjet template
     *
     * THIS ENDPOINT WORKS INTERNALLY ONLY
     *
     * CAN ONLY BE USED FROM BACKENDS WITHIN THE hcloud DEPLOYMENT AS THE ENDPOINT IS NOT PUBLICLY EXPOSED
     * @param mail MailjetMailDTO
     */
    sendMailMailjet = async (mail: MailjetMailDTO): Promise<void> => {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/mailjet"), mail).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    /**
     * sendMailMustache sends a new mail based on a mustache html body
     *
     * THIS ENDPOINT WORKS INTERNALLY ONLY
     *
     * CAN ONLY BE USED FROM BACKENDS WITHIN THE hcloud DEPLOYMENT AS THE ENDPOINT IS NOT PUBLICLY EXPOSED
     * @param mail TemplateMail
     * @deprecated in favor of sendMailMailjet
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
     * @deprecated in favor of sendMailMailjet
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
     * @deprecated in favor of sendMailMailjet
     */
    sendMailTemplate = async (mail: TemplateMail): Promise<void> => {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/template"), mail).catch((err: Error) => {
            throw err;
        });

        return resp.data;
    };

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/mailer/internal${endpoint}`;
    }
}
