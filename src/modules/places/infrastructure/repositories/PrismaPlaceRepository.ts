import { PrismaClient } from '@prisma/client'
import { PlaceRepository } from '../../domain/repositories/PlaceRepository'
import { Place } from '../../domain/models/Place'
import { dtoToPlace, placeToDTO } from '../../application/json-parsers'
import { FootTrafficLevel } from '../../domain/value-objects/FootTraffic'
import { PictureSizeType } from '../../domain/value-objects/PictureSize'

const prisma = new PrismaClient()

export class PrismaPlaceRepository implements PlaceRepository {
  async save(place: Place): Promise<Place> {
    const placeAsDTO = placeToDTO(place)
    const picturesWithoutVariants = (
      placeAsDTO.pictures?.length ? placeAsDTO.pictures : []
    )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ variants, ...pic }) => ({
        ...pic,
      }))

    const rawPlace = await prisma.place.create({
      include: {
        pictures: true,
      },
      data: {
        ...placeAsDTO,
        geoJSON: JSON.parse(JSON.stringify(placeAsDTO.geoJSON)),
        tags: {
          create: placeAsDTO.tags?.length ? placeAsDTO.tags : [],
        },
        typeTags: {
          create: placeAsDTO.typeTags?.length ? placeAsDTO.typeTags : [],
        },
        pictures: {
          create: picturesWithoutVariants,
        },
        relatedPlaces: undefined,
      },
    })

    const geoJsonAsString =
      typeof rawPlace.geoJSON === 'object'
        ? JSON.stringify(rawPlace.geoJSON)
        : rawPlace.geoJSON
    const prismaGeoJSON = JSON.parse(geoJsonAsString as string)

    return dtoToPlace({
      ...rawPlace,
      countryName: rawPlace.countryName || undefined,
      stateName: rawPlace.stateName || undefined,
      cityName: rawPlace.cityName || undefined,
      relatedPlaces: [],
      tags: [],
      typeTags: [],
      geoJSON: prismaGeoJSON || undefined,
      shortName: rawPlace.shortName || undefined,
      name: rawPlace.name,
      description: rawPlace.description || undefined,
      shortDescription: rawPlace.shortDescription || undefined,
      footTraffic: (rawPlace.footTraffic as FootTrafficLevel) || undefined,
      pictures: rawPlace.pictures.map((rawPic) => ({
        ...rawPic,
        variants: [],
        size: rawPic.size as PictureSizeType,
      })),
    })
  }

  async findAll(): Promise<Place[]> {
    const rawPlaces = await prisma.place.findMany({
      include: {
        pictures: true,
      },
    })
    return rawPlaces.map((rawPlace) => {
      const geoJsonAsString =
        typeof rawPlace.geoJSON === 'object'
          ? JSON.stringify(rawPlace.geoJSON)
          : rawPlace.geoJSON
      const prismaGeoJSON = JSON.parse(geoJsonAsString as string)

      return dtoToPlace({
        ...rawPlace,
        countryName: rawPlace.countryName || undefined,
        stateName: rawPlace.stateName || undefined,
        cityName: rawPlace.cityName || undefined,
        relatedPlaces: [],
        tags: [],
        typeTags: [],
        geoJSON: prismaGeoJSON || undefined,
        shortName: rawPlace.shortName || undefined,
        name: rawPlace.name,
        description: rawPlace.description || undefined,
        shortDescription: rawPlace.shortDescription || undefined,
        footTraffic: (rawPlace.footTraffic as FootTrafficLevel) || undefined,
        pictures: rawPlace.pictures.map((rawPic) => ({
          ...rawPic,
          variants: [],
          size: rawPic.size as PictureSizeType,
        })),
      })
    })
  }

  async findByState(state: string): Promise<Place[]> {
    const rawPlaces = await prisma.place.findMany({
      where: {
        stateName: state,
      },
      include: { pictures: true },
    })
    return rawPlaces.map((rawPlace) => {
      const geoJsonAsString =
        typeof rawPlace.geoJSON === 'object'
          ? JSON.stringify(rawPlace.geoJSON)
          : rawPlace.geoJSON
      const prismaGeoJSON = JSON.parse(geoJsonAsString as string)

      return dtoToPlace({
        ...rawPlace,
        countryName: rawPlace.countryName || undefined,
        stateName: rawPlace.stateName || undefined,
        cityName: rawPlace.cityName || undefined,
        relatedPlaces: [],
        tags: [],
        typeTags: [],
        geoJSON: prismaGeoJSON || undefined,
        shortName: rawPlace.shortName || undefined,
        name: rawPlace.name,
        description: rawPlace.description || undefined,
        shortDescription: rawPlace.shortDescription || undefined,
        footTraffic: (rawPlace.footTraffic as FootTrafficLevel) || undefined,
        pictures: rawPlace.pictures.map((rawPic) => ({
          ...rawPic,
          variants: [],
          size: rawPic.size as PictureSizeType,
        })),
      })
    })
  }
}
