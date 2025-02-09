import { User } from '../../domain/models/User'
import { TokenGenerator } from '../collaborators/token-generator'
import { PasswordEncoder } from '../collaborators/password-encoder'
import { UserRepository } from '../../domain/repositories/UserRepository'

export const signinWithEmailPassword = async (
  email: string,
  password: string,
  userRepository: UserRepository,
  passwordEncoder: PasswordEncoder,
  tokenGenerator: TokenGenerator,
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

  return tokenGenerator.generateToken<User>(foundUser)
}
