import { Email } from '../../domain/value-objects/Email'
import { TokenManager } from '../collaborators/token-manager'
import { PasswordEncoder } from '../collaborators/password-encoder'
import { UserRepository } from '../../domain/repositories/UserRepository'

export const signinWithEmailPassword = async (
  email: Email,
  password: string,
  userRepository: UserRepository,
  passwordEncoder: PasswordEncoder,
  tokenGenerator: TokenManager,
) => {
  const foundUser = await userRepository.findByEmail(email)

  if (!foundUser) {
    throw new Error('Invalid credentials')
  }

  const passwordMatches = await foundUser.passwordMatches(
    password,
    passwordEncoder.compare,
  )

  if (!passwordMatches) {
    throw new Error('Invalid credentials')
  }

  return await tokenGenerator.generateUserToken(foundUser)
}
