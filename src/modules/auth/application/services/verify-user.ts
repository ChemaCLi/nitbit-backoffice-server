import { User } from '../../domain/models/User'
import { Notifier } from '../collaborators/notifier'

export const verifyUser = async (
  user: User,
  verificationCode: string,
  notifier: Notifier,
) => {
  if (user.props.verificationCode !== verificationCode) {
    throw new Error('Invalid verification code')
  }

  notifier.notify(
    `Felicitaciones, ${user.profile.fullName}! Tu cuenta ha sido verificada.`,
  )

  user.verify()
}
