import { PasswordEncoder } from '../../application/collaborators/password-encoder'
import * as bcrypt from 'bcryptjs'

export class BcryptPasswordEncoder implements PasswordEncoder {
  private readonly saltRounds: number = 10 // Number of salt rounds for hashing

  async encode(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds)
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    // Compare the provided password with the hashed password
    return await bcrypt.compare(password, hashedPassword)
  }
}
