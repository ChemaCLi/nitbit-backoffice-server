import { Place } from '../domain/models/Place'
import { PlaceRepository } from '../domain/repositories/PlaceRepository'

export const registerPlace = async (
  place: Place,
  placeRepository: PlaceRepository,
) => {
  return placeRepository.save(place)
}
