import { PrismaClient } from '@prisma/client'
import { PlaceRepository } from '../../domain/repositories/PlaceRepository'
import { Place } from '../../domain/models/Place'
import { parseJsonToPlace } from '../helpers/parseJsonToPlace'

const prisma = new PrismaClient()

export class PrismaPlaceRepository implements PlaceRepository {
  async save(place: Place): Promise<Place> {
    const rawPlace = await prisma.place.create({
      data: {
        id: place.id.toString(),
        name: place.name,
        geoJSON: JSON.stringify(place.geoJSON.getValue()),
      },
    })

    console.log({ rawPlace }, rawPlace.geoJSON?.toString())

    return parseJsonToPlace({
      ...rawPlace,
      geoJSON: JSON.parse(rawPlace.geoJSON?.toString() || '{}'),
    })
  }

  async findAll(): Promise<Place[]> {
    const rawPlaces = await prisma.place.findMany()
    return rawPlaces.map((rawPlace) => {
      return parseJsonToPlace(rawPlace)
    })
  }
}
