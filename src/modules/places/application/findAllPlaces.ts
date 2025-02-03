import { PlaceRepository } from '../domain/repositories/PlaceRepository'

export const findAllPlaces = async (
  criteria: unknown | undefined,
  placeRepository: PlaceRepository,
) => {
  const places = await placeRepository.findAll()
  return places
}
