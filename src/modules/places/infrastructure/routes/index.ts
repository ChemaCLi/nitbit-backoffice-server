import { Place } from '../../domain/models/Place'
import express, { Response, Request } from 'express'
import { ID } from '../../../shared/domain/value-objects/ID'
import { registerPlace } from '../../application/services/registerPlace'
import { findAllPlaces } from '../../application/services/findAllPlaces'
import { PlaceRepository } from '../../domain/repositories/PlaceRepository'
import { PrismaPlaceRepository } from '../repositories/PrismaPlaceRepository'
import { GeoJSON } from '../../../shared/domain/value-objects/GeoJSON/GeoJSON'
import { validateCreatePlaceInput } from '../validators/validateCreatePlaceInput'

const router = express()

router.post('/', async (req: Request, res: Response) => {
  try {
    const body: Record<string, any> = req.body || {}
    const geoJSON = body.geoJSON
    await validateCreatePlaceInput(body)

    const placeRepository: PlaceRepository = new PrismaPlaceRepository()
    const place = new Place({
      id: new ID(),
      name: body.name,
      geoJSON: new GeoJSON({
        type: geoJSON.type,
        properties: geoJSON.properties,
        geometry: geoJSON.geometry,
      }),
    })
    const createdPlace = await registerPlace(place, placeRepository)
    res.json({
      message: 'The place has been created successfully',
      data: createdPlace,
    })
  } catch (e) {
    console.error(e)
    res.json({ error: 'Error creating the place', message: e.message })
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    const criteriaParams: Record<string, unknown> = req.params || {}

    const placeRepository: PlaceRepository = new PrismaPlaceRepository()
    const foundPlaces = await findAllPlaces(criteriaParams, placeRepository)

    res.json({
      message: 'Places found successfully',
      data: foundPlaces.map((place) => {
        return {
          id: place.id.toString(),
          name: place.name,
          geoJSON: place.geoJSON.getValue(),
        }
      }),
    })
  } catch (e) {
    console.error('errorsillo', e)
    res.json({ error: 'Error getting the place' })
  }
})

export default router
