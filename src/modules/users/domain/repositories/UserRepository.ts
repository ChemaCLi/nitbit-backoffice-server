import { User } from '../models/User'
import { ID } from '../../../shared/domain/value-objects/ID'
import { Email } from '../value-objects/Email'

export interface UserRepository {
  save(user: User): Promise<User>
  verify(user: User): Promise<User>
  findById(id: ID): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  update(user: User): Promise<User>
}
