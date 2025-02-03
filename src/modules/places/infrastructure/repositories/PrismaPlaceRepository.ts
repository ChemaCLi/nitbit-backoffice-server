import { PrismaClient } from '@prisma/client'
import { PlaceRepository } from '../../domain/repositories/PlaceRepository'
import { Place } from '../../domain/models/Place'
import { GeoJSON, GeoJSONProps } from '../../domain/value-objects/GeoJSON'
import { ID } from '../../domain/value-objects/ID'

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

    const geoJsonParsed = JSON.parse(
      rawPlace.geoJSON?.toString() || '{}',
    ) as GeoJSONProps

    return new Place({
      id: new ID(rawPlace.id),
      name: rawPlace.name,
      geoJSON: new GeoJSON({
        type: 'Feature',
        properties: geoJsonParsed.properties,
        geometry: geoJsonParsed.geometry,
      }),
    })
  }

  async findAll(): Promise<Place[]> {
    const rawPlaces = await prisma.place.findMany()
    return rawPlaces.map((rawPlace) => {
      const parsedGeoJson = JSON.parse(rawPlace.geoJSON?.toString() as string)
      return new Place({
        id: new ID(rawPlace.id),
        name: rawPlace.name,
        geoJSON: new GeoJSON({
          type: parsedGeoJson.type,
          properties: parsedGeoJson.properties,
          geometry: parsedGeoJson.geometry,
        }),
      })
    })
  }
}
