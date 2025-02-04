import {
  GeoJSON,
  Geometry,
  GeoJSONProperties,
  GeoJSONProps,
} from '../../../shared/domain/value-objects/GeoJSON/GeoJSON'
import { Place } from '../../domain/models/Place'
import { ID } from '../../../shared/domain/value-objects/ID'
import { DTO } from '../../../../types'

export const parseJsonToPlace = (rawPlaceJson: DTO<Place>) => {
  const rawGeoJSON = rawPlaceJson.geoJSON as GeoJSONProps

  return new Place({
    id: new ID(rawPlaceJson.id as string),
    name: rawPlaceJson.name as string,
    geoJSON: new GeoJSON({
      type: 'Feature',
      properties: rawGeoJSON.properties as GeoJSONProperties,
      geometry: rawGeoJSON.geometry as Geometry,
    }),
  })
}
