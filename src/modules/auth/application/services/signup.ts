import { User } from '../../domain/models/User'
import { Notifier } from '../collaborators/notifier'
import { PasswordEncoder } from '../collaborators/password-encoder'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { RandomCodeGenerator } from '../collaborators/verification-code-generator'

export const signup = async (
  user: User,
  userRepository: UserRepository,
  passwordEncoder: PasswordEncoder,
  notifier: Notifier,
  codeGenerator: RandomCodeGenerator,
) => {
  const hashedPassword = await passwordEncoder.encode(user.password as string)
  const verificationCode = await codeGenerator.generate()

  const userWithHashedPassword = new User({
    ...user.props,
    password: hashedPassword,
    verificationCode,
    status: 'pending_verification',
  })

  await userRepository.save(userWithHashedPassword)
  await notifier.notify(verificationCode)
}
