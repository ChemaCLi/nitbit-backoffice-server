import { ID } from '../value-objects/ID'
import { Tag } from './Tag'
import { Picture } from './Picture'
import { GeoJSON } from '../value-objects/GeoJSON'
import { FootTraffic } from '../value-objects/FootTraffic'

export interface PlaceProps {
  id: ID
  name: string
  geoJSON: GeoJSON
  shortName?: string
  description?: string
  shortDescription?: string
  tags?: Tag[]
  typeTags?: Tag[]
  footTraffic?: FootTraffic
  pictures?: Picture[]
  relatedPlaces?: Place[]
}

export class Place {
  constructor(public readonly props: PlaceProps) {}

  get id(): ID {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get geoJSON(): GeoJSON {
    return this.props.geoJSON
  }

  get shortName(): string | undefined {
    return this.props.shortName
  }

  get description(): string | undefined {
    return this.props.description
  }

  get shortDescription(): string | undefined {
    return this.props.shortDescription
  }

  get tags(): Tag[] {
    return this.props.tags || []
  }

  get typeTags(): Tag[] {
    return this.props.typeTags || []
  }

  get footTraffic(): FootTraffic | undefined {
    return this.props.footTraffic
  }

  get pictures(): Picture[] {
    return this.props.pictures || []
  }

  get relatedPlaces(): Place[] {
    return this.props.relatedPlaces || []
  }
}
