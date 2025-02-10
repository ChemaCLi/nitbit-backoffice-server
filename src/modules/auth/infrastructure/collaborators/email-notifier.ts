import { Resend } from 'resend'
import { Email } from '../../domain/value-objects/Email'
import { config } from '../../../shared/application/config'
import { Notifier } from '../../application/collaborators/notifier'

export class EmailNotifier implements Notifier {
  private readonly resend: Resend

  constructor(
    public readonly from: Email,
    public readonly to: Email,
    public readonly subject: string,
    public readonly template?: string,
  ) {
    this.resend = new Resend(config.mailing.RESEND_API_KEY)
  }

  async notify(message: string): Promise<void> {
    try {
      const { error } = await this.resend.emails.send({
        from: this.from.getValue(),
        to: this.to.getValue(),
        subject: this.subject,
        html: this.template
          ? this.template.replace('{{message}}', message)
          : message,
      })

      if (error) {
        console.error('Failed to send email:', error)
        throw new Error('Failed to send email')
      }
    } catch (err) {
      console.error('Error in EmailNotifier:', err)
      throw err
    }
  }
}
