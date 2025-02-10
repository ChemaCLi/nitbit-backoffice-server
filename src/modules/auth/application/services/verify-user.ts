import { Notifier } from '../collaborators/notifier'
import { Email } from '../../domain/value-objects/Email'
import { UserRepository } from '../../domain/repositories/UserRepository'

export const verifyUser = async (
  email: Email,
  userRepository: UserRepository,
  verificationCode: string,
  notifier: Notifier,
) => {
  const user = await userRepository.findByEmail(email)

  if (!user) {
    throw new Error('User not found')
  }

  if (!user.verificationCode || user.status !== 'pending_verification') {
    throw new Error('It seems the user has been already verified.')
  }

  if (
    !user.props.verificationCode ||
    user.props.verificationCode !== verificationCode
  ) {
    throw new Error('Invalid verification code')
  }

  await userRepository.verify(user)

  await notifier.notify(
    `${user.profile.fullName} te damos la bienvenida a NitBit!`,
  )

  return user
}
