"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotifier = void 0;
const resend_1 = require("resend");
const config_1 = require("../../../shared/application/config");
class EmailNotifier {
    from;
    to;
    subject;
    template;
    resend;
    constructor(from, to, subject, template) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.template = template;
        this.resend = new resend_1.Resend(config_1.config.mailing.RESEND_API_KEY);
    }
    async notify(message) {
        try {
            const { error } = await this.resend.emails.send({
                from: this.from.getValue(),
                to: this.to.getValue(),
                subject: this.subject,
                html: this.template
                    ? this.template.replace('{{message}}', message)
                    : message,
            });
            if (error) {
                console.error('Failed to send email:', error);
                throw new Error('Failed to send email');
            }
        }
        catch (err) {
            console.error('Error in EmailNotifier:', err);
            throw err;
        }
    }
}
exports.EmailNotifier = EmailNotifier;
//# sourceMappingURL=email-notifier.js.map