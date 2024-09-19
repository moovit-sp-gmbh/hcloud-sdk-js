import Base from "../../../Base";
import { HtmlMail, MailjetMailDTO, MustacheMail, TemplateMail } from "../../../interfaces/mailer";

export default class MailerInternal extends Base {
    /**
     * Sends a new mail based on a mailjet template.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param mail MailjetMailDTO
     */
    async sendMailMailjet(mail: MailjetMailDTO): Promise<void> {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/mailjet"), mail);

        return resp.data;
    }

    /**
     * Sends a new mail based on a mustache html body.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param mail TemplateMail
     * @deprecated in favor of sendMailMailjet
     */
    async sendMailMustache(mail: MustacheMail): Promise<void> {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/mustache"), mail);

        return resp.data;
    }

    /**
     * Sends a new mail based on a html body.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param mail TemplateMail
     * @deprecated in favor of sendMailMailjet
     */
    async sendMailHtml(mail: HtmlMail): Promise<void> {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/html"), mail);

        return resp.data;
    }

    /**
     * Sends a new mail based on an existing template.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param mail TemplateMail
     * @deprecated in favor of sendMailMailjet
     */
    async sendMailTemplate(mail: TemplateMail): Promise<void> {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/template"), mail);

        return resp.data;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/mailer/internal${endpoint}`;
    }
}
