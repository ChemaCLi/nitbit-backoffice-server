import express, { Response, Request } from 'express'
import { ID } from '../../../shared/domain/value-objects/ID'
import { dtoToPlace, placeToDTO } from '../../application/json-parsers'
import { registerPlace } from '../../application/services/registerPlace'
import { findAllPlaces } from '../../application/services/findAllPlaces'
import { PlaceRepository } from '../../domain/repositories/PlaceRepository'
import { PrismaPlaceRepository } from '../repositories/PrismaPlaceRepository'
import { validateCreatePlaceInput } from '../validators/validateCreatePlaceInput'

const router = express()

router.post('/', async (req: Request, res: Response) => {
  try {
    const body: Record<string, any> = req.body || {}
    await validateCreatePlaceInput(body)

    const placeRepository: PlaceRepository = new PrismaPlaceRepository()
    const place = dtoToPlace({
      ...body,
      name: body.name as string,
      geoJSON: body.geoJSON,
      id: new ID().toString(),
    })
    const createdPlace = await registerPlace(place, placeRepository)
    const createdPlaceAsDTO = placeToDTO(createdPlace)

    res.statusCode = 201
    res.json({
      message: 'The place has been created successfully',
      data: createdPlaceAsDTO,
    })
  } catch (e) {
    console.error(e)
    const validationErrors = (e.errors || []).join('. ')
    const message = e.errors?.length > 0 ? validationErrors : e.message

    res.statusCode = 500
    if (validationErrors) {
      res.statusCode = 400
    }
    res.json({ error: 'Error creating the place', message })
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
        return placeToDTO(place)
      }),
    })
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.json({ error: 'Error getting the place' })
  }
})

export default router
