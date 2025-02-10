import {
  User,
  UserStatus,
  UserProfile,
  UserOnlineStatus,
} from '../../domain/models/User'
import { PrismaClient } from '@prisma/client'
import { Email } from '../../domain/value-objects/Email'
import { Phone } from '../../domain/value-objects/Phone'
import { ID } from '../../../shared/domain/value-objects/ID'
import { UserRepository } from '../../domain/repositories/UserRepository'

const prisma = new PrismaClient()

export class PrismaUserRepository implements UserRepository {
  async save(user: User): Promise<User> {
    return user
  }

  async findById(id: ID): Promise<User | null> {
    const rawFoundUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: id.toString(),
      },
      include: {
        profile: true,
      },
    })

    const user = new User({
      id: new ID(rawFoundUser.id),
      password: rawFoundUser.password,
      status: rawFoundUser.status as UserStatus,
      onlineStatus: rawFoundUser.onlineStatus as UserOnlineStatus,
      friends: [],
      blockedUsers: [],
      profile: new UserProfile({
        id: new ID(rawFoundUser.profile?.id),
        email: new Email(rawFoundUser.profile?.email as string),
        phone: new Phone(rawFoundUser.profile?.phone as string),
        fullName: rawFoundUser.profile?.fullName as string,
      }),
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const rawFoundUser = await prisma.user.findFirstOrThrow({
      where: {
        profile: {
          email: email.toString(),
        },
      },
      include: {
        profile: true,
      },
    })

    const user = new User({
      id: new ID(rawFoundUser.id),
      password: rawFoundUser.password,
      status: rawFoundUser.status as UserStatus,
      onlineStatus: rawFoundUser.onlineStatus as UserOnlineStatus,
      friends: [],
      blockedUsers: [],
      profile: new UserProfile({
        id: new ID(rawFoundUser.profile?.id),
        email: new Email(rawFoundUser.profile?.email as string),
        phone: new Phone(rawFoundUser.profile?.phone as string),
        fullName: rawFoundUser.profile?.fullName as string,
      }),
    })

    return user
  }
}
