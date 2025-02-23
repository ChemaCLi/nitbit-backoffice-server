import { PlaceRepository } from '../../domain/repositories/PlaceRepository'

export const findPlacesByState = async (
  state: string,
  placeRepository: PlaceRepository,
) => {
  const places = await placeRepository.findByState(state)
  return places
}
