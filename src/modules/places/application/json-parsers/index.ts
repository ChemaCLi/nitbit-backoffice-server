import { Tag } from '../../domain/models/Tag'
import { Place } from '../../domain/models/Place'
import { Picture } from '../../domain/models/Picture'
import { ID } from '../../../shared/domain/value-objects/ID'
import { PictureDTO, PlaceDTO, TagDTO } from '../dtos/PlaceDTO'
import { FootTraffic } from '../../domain/value-objects/FootTraffic'
import { GeoJSON } from '../../../shared/domain/value-objects/GeoJSON/GeoJSON'

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export const tagToDTO = (tag: Tag): TagDTO => ({
  id: tag.id.toString(),
  name: tag.name,
  icon: tag.icon,
  description: tag.description,
})

export const dtoToTag = (dto: WithRequired<TagDTO, 'id'>): Tag => {
  return new Tag({
    ...dto,
    id: new ID(dto.id),
  })
}

export const pictureToDTO = (picture: Picture): PictureDTO => ({
  id: picture.id.toString(),
  imageUrl: picture.imageUrl,
  altText: picture.altText,
  figcaptionText: picture.figcaptionText,
  size: picture.size,
  variants: picture.variants.map(pictureToDTO),
})

export const dtoToPicture = (dto: WithRequired<PictureDTO, 'id'>): Picture => {
  return new Picture({
    ...dto,
    id: new ID(dto.id),
    variants: dto.variants.map(dtoToPicture),
  })
}

export const placeToDTO = (place: Place): PlaceDTO => {
  return {
    id: place.id.toString(),
    name: place.name,
    countryName: place.countryName,
    cityName: place.cityName,
    stateName: place.stateName,
    geoJSON: place.geoJSON.getValue(),
    shortName: place.shortName,
    description: place.description,
    shortDescription: place.shortDescription,
    tags: place.tags.map(tagToDTO),
    typeTags: place.typeTags.map(tagToDTO),
    footTraffic: place.footTraffic?.getValue(),
    pictures: place.pictures.map(pictureToDTO),
    relatedPlaces: place.relatedPlaces.map(placeToDTO),
  }
}

export const dtoToPlace = (dto: WithRequired<PlaceDTO, 'id'>): Place => {
  return new Place({
    ...dto,
    id: new ID(dto.id),
    geoJSON: new GeoJSON(dto.geoJSON),
    tags: dto.tags?.map(dtoToTag),
    typeTags: dto.typeTags?.map(dtoToTag),
    pictures: dto.pictures?.map(dtoToPicture),
    footTraffic: dto.footTraffic ? new FootTraffic(dto.footTraffic) : undefined,
    relatedPlaces: dto.relatedPlaces?.map(dtoToPlace),
  })
}
