import express, { Response, Request } from 'express'
import { Email } from '../../domain/value-objects/Email'
import { signinWithEmailPassword } from '../../application/services/signin'
import { PrismaUserRepository } from '../repositories/PrismaUserRepository'
import { BcryptPasswordEncoder } from '../collaborators/bcrypt-password-encoder'
import { JwtTokenManager } from '../collaborators/jwt-token-manager'
const router = express()

router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const userEmail = new Email(email)
    const jwtToken = await signinWithEmailPassword(
      userEmail,
      password,
      new PrismaUserRepository(),
      new BcryptPasswordEncoder(),
      new JwtTokenManager(),
    )

    res.status(200).json({
      message: 'User autenticated',
      data: {
        token: jwtToken,
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
    res.json({ error: 'Error while signing in the user', message })
  }
})

export const signinEndpoint = router
