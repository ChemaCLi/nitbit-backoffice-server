import {
  Geometry,
  GeoJSONType,
  GeoJSONProperties,
} from '../../../shared/domain/value-objects/GeoJSON/GeoJSON'
import { FootTrafficLevel } from '../../domain/value-objects/FootTraffic'
import { PictureSize } from '../../domain/value-objects/PictureSize'

export interface GeoJsonDTO {
  type: GeoJSONType
  properties: GeoJSONProperties
  geometry: Geometry
}

export interface TagDTO {
  id?: string
  name: string
  icon?: string
  description?: string
}

export type FootTrafficDTO = FootTrafficLevel

export interface PictureDTO {
  id?: string
  imageUrl: string
  altText: string
  figcaptionText: string
  size: PictureSize
  variants: Omit<PictureDTO, 'variants'>[]
}

export interface PlaceDTO {
  id?: string
  name: string
  countryName?: string
  stateName?: string
  cityName?: string
  geoJSON: GeoJsonDTO
  shortName?: string
  description?: string
  shortDescription?: string
  tags?: TagDTO[]
  typeTags?: TagDTO[]
  footTraffic?: FootTrafficDTO
  pictures?: PictureDTO[]
  relatedPlaces?: PlaceDTO[]
}
