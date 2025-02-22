import express, { Response, Request } from 'express'
import { placeToDTO } from '../../application/json-parsers'
import { findPlacesByState } from '../../application/services/findPlacesByState'
import { PlaceRepository } from '../../domain/repositories/PlaceRepository'
import { PrismaPlaceRepository } from '../repositories/PrismaPlaceRepository'

const router = express()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { state } = req.query

    if (typeof state !== 'string') {
      throw new Error('Invalid request body')
    }

    const placeRepository: PlaceRepository = new PrismaPlaceRepository()
    const foundPlaces = await findPlacesByState(state, placeRepository)

    res.json({
      message: 'Places found successfully',
      data: foundPlaces.map((place) => {
        return placeToDTO(place)
      }),
    })
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.json({ error: 'Error getting the places' })
  }
})

export const findPlacesByStateEndpoint = router
