import Base, { MaybeRaw } from "../../../Base";
import { HtmlMail, MailDTO, MailjetResponse, MustacheMail, ResendResponse, TemplateMail } from "../../../interfaces/mailer";

export default class MailerInternal extends Base {
    /**
     * Sends a new mail based on a mailjet template.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param mail MailDTO
     */
    async sendMailMailjet<R extends boolean = false>(mail: MailDTO, raw?: { raw: R }): Promise<MaybeRaw<R, MailjetResponse>> {
        const resp = await this.axios.post<MailjetResponse>(this.getEndpoint("/v1/send/mailjet"), mail);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, MailjetResponse>;
    }

    /**
     * Sends a new mail based on a mustache html body.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param mail TemplateMail
     * @deprecated in favor of sendMailMailjet
     */
    async sendMailMustache<R extends boolean = false>(mail: MustacheMail, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/mustache"), mail);

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Sends a new mail based on a html body.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param mail TemplateMail
     * @deprecated in favor of sendMailMailjet
     */
    async sendMailHtml<R extends boolean = false>(mail: HtmlMail, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/html"), mail);

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Sends a new mail based on an existing template.
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param mail TemplateMail
     * @deprecated in favor of sendMailMailjet
     */
    async sendMailTemplate<R extends boolean = false>(mail: TemplateMail, raw?: { raw: R }): Promise<MaybeRaw<R, void>> {
        const resp = await this.axios.post<void>(this.getEndpoint("/v1/send/template"), mail);

        return (raw?.raw ? resp : undefined) as MaybeRaw<R, void>;
    }

    /**
     * Sends a new mail based on an existing react-mail template using resend.com
     *
     * THIS IS AN INTERNAL ENDPOINT AND CAN ONLY BE USED FROM BACKENDS WITHIN THE HCLOUD DEPLOYMENT
     * @param mail MailDTO
     */
    async sendMailResend<R extends boolean = false>(mail: MailDTO, raw?: { raw: R }): Promise<MaybeRaw<R, ResendResponse>> {
        const resp = await this.axios.post<ResendResponse>(this.getEndpoint("/v1/send/resend"), mail);

        return (raw?.raw ? resp : resp.data) as MaybeRaw<R, ResendResponse>;
    }

    protected getEndpoint(endpoint: string): string {
        return `${this.options.server}/api/mailer/internal${endpoint}`;
    }
}
