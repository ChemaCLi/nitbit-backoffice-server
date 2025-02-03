import { Place } from '../../domain/models/Place'
import { GeoJSON } from '../../domain/value-objects/GeoJSON'
import { ID } from '../../domain/value-objects/ID'

export const parseJsonToPlace = (rawPlaceJson: Record<string, unknown>) => {
  const rawGeoJSON = rawPlaceJson.geoJSON as Record<string, unknown>

  return new Place({
    id: new ID(rawPlaceJson.id as string),
    name: rawPlaceJson.name as string,
    geoJSON: new GeoJSON(
      rawGeoJSON.type as 'Feature',
      rawGeoJSON.properties as Record<string, string | number>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rawGeoJSON.geometry as any,
    ),
  })
}
