import express, { Response, Request } from 'express'
import { PrismaPlaceRepository } from '../repositories/PrismaPlaceRepository'
import { PlaceRepository } from '../../domain/repositories/PlaceRepository'
import { Place } from '../../domain/models/Place'
import { registerPlace } from '../../application/registerPlace'
import { findAllPlaces } from '../../application/findAllPlaces'
import { ID } from '../../domain/value-objects/ID'
import { GeoJSON } from '../../domain/value-objects/GeoJSON'

const router = express()

router.post('/', async (req: Request, res: Response) => {
  try {
    const body: Record<string, any> = req.body || {}
    const geoJSON = body.geoJSON

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
    res.json({ error: 'Error creating the place' })
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
    console.error(e)
    res.json({ error: 'Error getting the place' })
  }
})

export default router
