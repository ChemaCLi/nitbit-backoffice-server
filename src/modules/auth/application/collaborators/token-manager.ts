import { User } from '../../domain/models/User'

export abstract class TokenManager {
  abstract generateUserToken(payload: User): Promise<string>
  abstract verifyUserToken(token: string, user: User): Promise<boolean>
}
