import express, { Response, Request } from 'express'
import { PrismaUserRepository } from '../repositories/PrismaUserRepository'
import { EmailNotifier } from '../collaborators/email-notifier'
import { config } from '../../../shared/application/config'
import { Email } from '../../domain/value-objects/Email'
import { verifyUser } from '../../application/services/verify-user'
const router = express()

router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { email, verificationCode } = req.body

    const userEmail = new Email(email)
    const userRepository = new PrismaUserRepository()
    const mailTemplate = `<p>¡Felicidades! Tu cuenta ha sido verificada. {{message}}</p>`
    const notifier = new EmailNotifier(
      new Email(config.mailing.SYSTEM_EMAIL),
      userEmail,
      'Cuenta NitBit verificada',
      mailTemplate,
    )

    const verifiedUser = await verifyUser(
      userEmail,
      userRepository,
      verificationCode,
      notifier,
    )

    res.status(200).json({
      message: 'User verified successfully',
      data: {
        id: verifiedUser.id.toString(),
        status: verifiedUser.status,
      },
    })
  } catch (e) {
    console.error(e)
    const validationErrors = (e.errors || []).join('. ')
    const message = e.errors?.length > 0 ? validationErrors : e.message

    res.statusCode = 500
    if (validationErrors) {
      res.statusCode = 400
    }
    res.json({ error: 'Error verifying the code', message })
  }
})

export const verifyNewUserEndpoint = router
