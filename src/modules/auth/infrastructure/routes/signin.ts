import express, { Response, Request } from 'express'
import { Email } from '../../domain/value-objects/Email'
import { JwtTokenManager } from '../collaborators/jwt-token-manager'
import { PrismaUserRepository } from '../repositories/PrismaUserRepository'
import { BcryptPasswordEncoder } from '../collaborators/bcrypt-password-encoder'
import { AuthException } from '../../domain/exceptions/AuthException'
const router = express()

router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const userEmail = new Email(email)
    const userRepository = new PrismaUserRepository()

    // First verify credentials and get the user
    const foundUser = await userRepository.findByEmail(userEmail)

    if (!foundUser) {
      throw new AuthException('Invalid credentials: User not found')
    }

    const passwordEncoder = new BcryptPasswordEncoder()
    const passwordMatches = await foundUser.passwordMatches(
      password,
      passwordEncoder.compare,
    )

    if (!passwordMatches) {
      throw new AuthException('Invalid credentials: Password does not match')
    }

    // Check if user is active
    if (foundUser.status !== 'active') {
      throw new AuthException(
        `User account is not active. User ID: ${foundUser.id.toString()}, Current status: ${
          foundUser.status
        }`,
      )
    }

    // Generate token
    const tokenManager = new JwtTokenManager()
    const jwtToken = await tokenManager.generateUserToken(foundUser)

    // Prepare user data for response
    const userData = {
      id: foundUser.id.toString(),
      fullName: foundUser.profile.fullName,
      email: foundUser.profile.email.getValue(),
      phone: foundUser.profile.phone.getValue(),
      status: foundUser.status,
      onlineStatus: foundUser.onlineStatus,
      lastSeen: foundUser.lastSeen,
      friends: foundUser.friends.map((friend) => ({
        id: friend.id.toString(),
        fullName: friend.profile.fullName,
      })),
      blockedUsers: foundUser.blockedUsers.map((user) => ({
        id: user.id.toString(),
        fullName: user.profile.fullName,
      })),
    }

    res.status(200).json({
      message: 'User authenticated successfully',
      data: {
        token: jwtToken,
        user: userData,
      },
    })
  } catch (e) {
    console.error(e)

    // Handle AuthException specifically
    if (e instanceof AuthException) {
      res.status(401).json({
        error: 'Authentication error',
        message: 'Authentication error',
      })
      return
    }

    // Handle other types of errors
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
