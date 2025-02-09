import { Email } from '../value-objects/Email'
import { Phone } from '../value-objects/Phone'
import { ID } from '../../../shared/domain/value-objects/ID'

export type UserStatus =
  | 'active'
  | 'inactive'
  | 'pending_verification'
  | 'banned'
export type UserOnlineStatus = 'online' | 'offline' | 'away'

export interface UserProfileProps {
  id: ID
  fullName: string
  email: Email
  phone: Phone
  friends: User[]
  blockedUsers: User[]
}

export interface UserProps {
  id: ID
  profile: UserProfile
  password: string
  status: UserStatus
  verificationCode?: string
  onlineStatus: UserOnlineStatus
  lastSeen?: Date
}

export class UserProfile {
  constructor(public readonly props: UserProfileProps) {
    if (!props.fullName) {
      throw new Error('User full name is required')
    }

    if (!props.email) {
      throw new Error('User email is required')
    }

    if (!props.phone) {
      throw new Error('User phone is required')
    }
  }

  get id(): ID {
    return this.props.id
  }

  get fullName(): string {
    return this.props.fullName
  }

  get email(): Email {
    return this.props.email
  }

  get phone(): Phone {
    return this.props.phone
  }

  get friends(): User[] {
    return this.props.friends
  }

  get blockedUsers(): User[] {
    return this.props.blockedUsers
  }
}

export class User {
  constructor(public readonly props: UserProps) {
    if (
      !['active', 'inactive', 'banned', 'pending_verification'].includes(
        props.status,
      )
    ) {
      throw new Error('Invalid user status')
    }

    if (!['online', 'offline', 'away'].includes(props.onlineStatus)) {
      throw new Error('Invalid online status')
    }

    if (props.lastSeen && !(props.lastSeen instanceof Date)) {
      throw new Error('Invalid last seen date')
    }

    if (props.status === 'pending_verification' && !props.verificationCode) {
      throw new Error('Verification code is required')
    }

    if (!props.profile) {
      throw new Error('User profile is required')
    }
  }

  get id(): ID {
    return this.props.id
  }

  get profile(): UserProfile {
    return this.props.profile
  }

  get password(): string {
    return this.props.password
  }

  async passwordMatches(
    password: string,
    passwordValidator: (
      inputPassword: string,
      storedPassword: string,
    ) => Promise<boolean>,
  ): Promise<boolean> {
    return await passwordValidator(password, this.password)
  }

  verify(): void {
    this.props.verificationCode = undefined
    this.props.status = 'active'
  }

  get status(): UserStatus {
    return this.props.status as UserStatus
  }

  get onlineStatus(): UserOnlineStatus {
    return this.props.onlineStatus as UserOnlineStatus
  }

  get lastSeen(): Date | undefined {
    return this.props.lastSeen
  }

  get verificationCode(): string | undefined {
    return this.props.verificationCode
  }
}
