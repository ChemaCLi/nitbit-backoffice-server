import express, { Response, Request } from 'express'
import { placeToDTO } from '../../application/json-parsers'
import { findAllPlaces } from '../../application/services/findAllPlaces'
import { PlaceRepository } from '../../domain/repositories/PlaceRepository'
import { PrismaPlaceRepository } from '../repositories/PrismaPlaceRepository'

const router = express()

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

export const findAllPlacesEndpoint = router
