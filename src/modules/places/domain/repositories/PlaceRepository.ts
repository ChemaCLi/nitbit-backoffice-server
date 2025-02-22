import { Place } from '../models/Place'

export interface PlaceRepository {
  save(place: Place): Promise<Place>
  findAll(criteria?: unknown): Promise<Place[]>
  findByState(state: string): Promise<Place[]>
}
