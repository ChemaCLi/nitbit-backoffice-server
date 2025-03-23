import { User } from '../../domain/models/User'
import { Notifier } from '../collaborators/notifier'
import { PasswordEncoder } from '../collaborators/password-encoder'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { RandomCodeGenerator } from '../collaborators/verification-code-generator'
import { NotificationException } from '../../domain/exceptions/NotificationException'

export const signup = async (
  user: User,
  userRepository: UserRepository,
  passwordEncoder: PasswordEncoder,
  notifier: Notifier,
  codeGenerator: RandomCodeGenerator,
): Promise<User> => {
  const userWithSameEmail = await userRepository.findByEmail(user.profile.email)
  if (userWithSameEmail) {
    throw new Error('The email is not available. It has been already taken.')
  }

  const hashedPassword = await passwordEncoder.encode(user.password as string)
  const verificationCode = await codeGenerator.generate()

  const userWithHashedPassword = new User({
    ...user.props,
    password: hashedPassword,
    verificationCode,
    status: 'pending_verification',
  })

  await userRepository.save(userWithHashedPassword)

  try {
    await notifier.notify(verificationCode)
  } catch (error) {
    // Si falla la notificación, lanzamos NotificationException con los detalles
    throw new NotificationException(
      error instanceof Error ? error.message : 'Failed to send notification',
      {
        email: user.profile.email.getValue(),
        phone: user.profile.phone.getValue(),
      },
      verificationCode,
      userWithHashedPassword.id.toString(),
    )
  }

  return userWithHashedPassword
}
