import express, { Response, Request } from 'express'
import { signup } from '../../application/services/signup'
import { User, UserProfile } from '../../domain/models/User'
import { ID } from '../../../shared/domain/value-objects/ID'
import { Notifier } from '../../application/collaborators/notifier'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { PasswordEncoder } from '../../application/collaborators/password-encoder'
import { RandomCodeGenerator } from '../../application/collaborators/verification-code-generator'
const router = express()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, password } = req.body

    const user = new User({
      id: new ID(),
      password,
      status: 'pending_verification',
      onlineStatus: 'offline',
      profile: new UserProfile({
        id: new ID(),
        fullName,
        email,
        phone,
        friends: [],
        blockedUsers: [],
      }),
    })

    const userRepository: UserRepository | undefined = undefined
    const passwordEncoder: PasswordEncoder | undefined = undefined
    const notifier: Notifier | undefined = undefined
    const codeGenerator: RandomCodeGenerator | undefined = undefined

    await signup(user, userRepository, passwordEncoder, notifier, codeGenerator)
    res.json({ message: 'User signed up successfully' })
  } catch (e) {
    console.error(e)
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
