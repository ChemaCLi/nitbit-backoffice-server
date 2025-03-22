import express, { Response, Request } from 'express'
import { Phone } from '../../domain/value-objects/Phone'
import { Email } from '../../domain/value-objects/Email'
import { config } from '../../../shared/application/config'
import { signup } from '../../application/services/signup'
import { User, UserProfile } from '../../domain/models/User'
import { ID } from '../../../shared/domain/value-objects/ID'
import { EmailNotifier } from '../collaborators/email-notifier'
import { Notifier } from '../../application/collaborators/notifier'
import { validateSignupInput } from '../validators/validateSignupInput'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { EasyCodeGenerator } from '../collaborators/random-code-generator'
import { PrismaUserRepository } from '../repositories/PrismaUserRepository'
import { BcryptPasswordEncoder } from '../collaborators/bcrypt-password-encoder'
import { PasswordEncoder } from '../../application/collaborators/password-encoder'
import { RandomCodeGenerator } from '../../application/collaborators/verification-code-generator'
import { NotificationException } from '../../domain/exceptions/NotificationException'

const router = express()

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, password } = req.body

    await validateSignupInput({
      fullName,
      email,
      phone,
      password,
    })

    const user = new User({
      id: new ID(),
      password,
      status: 'pending_verification',
      onlineStatus: 'offline',
      friends: [],
      blockedUsers: [],
      profile: new UserProfile({
        id: new ID(),
        fullName,
        email: new Email(email),
        phone: new Phone(phone),
      }),
    })

    const emailTemplate =
      '<p>Hola. Este es tu código de verificación <strong>{{message}}</strong></p>'

    const userRepository: UserRepository = new PrismaUserRepository()
    const passwordEncoder: PasswordEncoder = new BcryptPasswordEncoder()
    const notifier: Notifier = new EmailNotifier(
      new Email(config.mailing.SYSTEM_EMAIL),
      user.profile.email,
      'Código de verificación NitBit',
      emailTemplate,
    )

    const codeGenerator: RandomCodeGenerator = new EasyCodeGenerator()

    const createdUser = await signup(
      user,
      userRepository,
      passwordEncoder,
      notifier,
      codeGenerator,
    )

    // Si llegamos aquí, la cuenta se creó correctamente
    res.json({
      message: 'User signed up successfully',
      data: {
        id: createdUser.id.toString(),
        email: createdUser.profile.email.getValue(),
      },
    })
  } catch (e) {
    console.error(e)

    // Manejar específicamente errores de notificación
    if (e instanceof NotificationException) {
      // Log detallado del error de notificación
      console.error('Notification error:', {
        error: e.message,
        recipient: e.recipient,
        content: e.content,
        userId: e.userId,
      })

      // Si la cuenta se creó pero falló la notificación, responder con éxito
      if (e.userId) {
        res.json({
          message: 'User signed up successfully',
          data: {
            id: e.userId,
            email: e.recipient.email,
          },
        })
        return
      }
    }

    // Manejar otros tipos de errores
    const validationErrors = (e.errors || []).join('. ')
    const message = e.errors?.length > 0 ? validationErrors : e.message

    res.statusCode = 500
    if (validationErrors) {
      res.statusCode = 400
    }
    res.json({ error: 'Error registering the user', message })
  }
})

export const signupEndpoint = router
