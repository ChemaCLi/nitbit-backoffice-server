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
    await prisma.user.create({
      data: {
        id: user.id.toString(),
        password: user.password as string,
        status: user.status,
        onlineStatus: user.onlineStatus,
        verificationCode: user.verificationCode as string,
        profile: {
          create: {
            id: user.profile.id.toString(),
            fullName: user.profile.fullName,
            email: user.profile.email.getValue(),
            phone: user.profile.phone.getValue(),
          },
        },
      },
    })

    return user
  }

  async verify(user: User): Promise<User> {
    await prisma.user.update({
      where: {
        id: user.id.toString(),
      },
      data: {
        status: 'active',
        verificationCode: null,
      },
    })

    user.verify()
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
      verificationCode: rawFoundUser.verificationCode || undefined,
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

  async findByEmail(email: Email): Promise<User | null> {
    const rawFoundUser = await prisma.user.findFirst({
      where: {
        profile: {
          email: email.getValue(),
        },
      },
      include: {
        profile: true,
      },
    })

    if (!rawFoundUser) return null

    const user = new User({
      id: new ID(rawFoundUser.id),
      password: rawFoundUser.password,
      status: rawFoundUser.status as UserStatus,
      onlineStatus: rawFoundUser.onlineStatus as UserOnlineStatus,
      verificationCode: rawFoundUser.verificationCode || undefined,
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

  async update(user: User): Promise<User> {
    await prisma.user.update({
      where: {
        id: user.id.toString(),
      },
      data: {
        status: user.status,
        onlineStatus: user.onlineStatus,
        profile: {
          update: {
            fullName: user.profile.fullName,
            email: user.profile.email.getValue(),
            phone: user.profile.phone.getValue(),
          },
        },
      },
    })

    return user
  }
}
