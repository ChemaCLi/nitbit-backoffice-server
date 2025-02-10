import jwt from 'jsonwebtoken'
import { StringValue } from 'ms'
import { User } from '../../domain/models/User'
import { config } from '../../../shared/application/config'
import { TokenManager } from '../../application/collaborators/token-manager'

export class JwtTokenManager implements TokenManager {
  private readonly secret: string
  private readonly expiresIn: StringValue

  constructor() {
    this.secret = config.jwt.JWT_SECRET
    this.expiresIn = '24h'
  }

  async generateUserToken(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          id: user.id,
          email: user.profile.email.getValue(),
          phone: user.profile.phone.getValue(),
        }, // Personaliza según tu User model
        this.secret,
        { expiresIn: this.expiresIn },
        (err, token) => {
          if (err || !token) {
            reject(new Error('Error generating JWT token'))
          } else {
            resolve(token)
          }
        },
      )
    })
  }

  async verifyUserToken(token: string, user: User): Promise<boolean> {
    return new Promise((resolve) => {
      jwt.verify(token, this.secret, (err, decoded: any) => {
        if (err) {
          resolve(false)
        } else {
          // Check if the token is connected to the
          resolve(
            decoded.id === user.id && decoded.email === user.profile.email,
          )
        }
      })
    })
  }
}
