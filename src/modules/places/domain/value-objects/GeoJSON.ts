import { CoordinatePair } from './CoordinatePair'

type GeometryType = 'Point' | 'LineString' | 'Polygon'

export class GeoJSON {
  constructor(
    private readonly type: 'Feature',
    private readonly properties: Record<string, string | number>,
    private readonly geometry: {
      coordinates: CoordinatePair | CoordinatePair[] | CoordinatePair[][]
      type: GeometryType
    },
  ) {
    if (type !== 'Feature') {
      console.log(type)
      throw new Error('Invalid GeoJSON type')
    }
  }

  getValue() {
    return {
      type: this.type,
      properties: this.properties,
      geometry: {
        coordinates: this.geometry.coordinates,
        type: this.geometry.type,
      },
    }
  }
}
