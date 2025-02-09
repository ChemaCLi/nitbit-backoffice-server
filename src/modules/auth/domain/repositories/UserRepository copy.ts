import { User } from '../models/User'
import { ID } from '../../../shared/domain/value-objects/ID'

export interface UserRepository {
  save(place: User): Promise<User>
  findById(id: ID): Promise<User | null>
}
