import express, { Response, Request } from 'express'
import { placeToDTO } from '../../application/json-parsers'
import { PlaceRepository } from '../../domain/repositories/PlaceRepository'
import { PrismaPlaceRepository } from '../repositories/PrismaPlaceRepository'
import { findPlacesByState } from '../../application/services/findPlacesByState'

const router = express()

router.get('/states/:state', async (req: Request, res: Response) => {
  try {
    const { state } = req.params

    if (typeof state !== 'string') {
      throw new Error('Invalid request body')
    }

    const placeRepository: PlaceRepository = new PrismaPlaceRepository()
    const foundPlaces = await findPlacesByState(state, placeRepository)

    const message =
      foundPlaces.length > 0
        ? 'Places found successfully'
        : `There are no places for the state ${state}`

    res.json({
      message,
      data: foundPlaces.map((place) => placeToDTO(place)),
    })
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.json({ error: 'Error getting the places' })
  }
})

export const findPlacesByStateEndpoint = router
