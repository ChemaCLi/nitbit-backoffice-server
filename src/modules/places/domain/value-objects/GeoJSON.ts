import { CoordinatePair } from './CoordinatePair'

export type GeoJSONType = 'Feature'
export type GeometryType = 'Point' | 'LineString' | 'Polygon'
export type GeoJSONProperties = Record<string, string | number>

export type Geometry = {
  type: GeometryType
  coordinates: CoordinatePair | CoordinatePair[] | CoordinatePair[][]
}

export type GeoJSONProps = {
  type: GeoJSONType
  properties: GeoJSONProperties
  geometry: Geometry
}

export class GeoJSON {
  constructor(private readonly props: GeoJSONProps) {
    if (props.type !== 'Feature') {
      throw new Error('Invalid GeoJSON type')
    }
  }

  getValue() {
    return {
      type: this.props.type,
      properties: this.props.properties,
      geometry: {
        type: this.props.geometry.type,
        coordinates: this.props.geometry.coordinates,
      },
    }
  }
}
