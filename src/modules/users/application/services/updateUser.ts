import { User, UserProfile } from '../../domain/models/User'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { ID } from '../../../shared/domain/value-objects/ID'
import { Email } from '../../domain/value-objects/Email'
import { Phone } from '../../domain/value-objects/Phone'
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException'
import { InvalidUserDataException } from '../../domain/exceptions/InvalidUserDataException'

interface UpdateUserInput {
  fullName?: string
  email?: string
  phone?: string
  onlineStatus?: 'online' | 'offline'
}

export const updateUser = async (
  userId: string,
  updateData: UpdateUserInput,
  userRepository: UserRepository,
): Promise<User> => {
  const user = await userRepository.findById(new ID(userId))

  if (!user) {
    throw new UserNotFoundException(userId)
  }

  // Validar datos si se proporcionan
  if (updateData.email) {
    try {
      new Email(updateData.email)
    } catch (error) {
      throw new InvalidUserDataException('Invalid email format')
    }
  }

  if (updateData.phone) {
    try {
      new Phone(updateData.phone)
    } catch (error) {
      throw new InvalidUserDataException('Invalid phone format')
    }
  }

  if (
    updateData.onlineStatus &&
    !['online', 'offline'].includes(updateData.onlineStatus)
  ) {
    throw new InvalidUserDataException('Invalid online status')
  }

  // Actualizar solo los campos proporcionados
  const updatedProfile = new UserProfile({
    id: user.profile.id,
    fullName: updateData.fullName || user.profile.fullName,
    email: updateData.email ? new Email(updateData.email) : user.profile.email,
    phone: updateData.phone ? new Phone(updateData.phone) : user.profile.phone,
  })

  const updatedUser = new User({
    id: user.id,
    password: user.password,
    status: user.status,
    onlineStatus: updateData.onlineStatus || user.onlineStatus,
    friends: user.friends,
    blockedUsers: user.blockedUsers,
    profile: updatedProfile,
  })

  return await userRepository.update(updatedUser)
}
