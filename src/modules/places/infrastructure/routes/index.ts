import express, { Response, Request } from 'express'
import { PrismaPlaceRepository } from '../repositories/PrismaPlaceRepository'
import { PlaceRepository } from '../../domain/repositories/PlaceRepository'
import { Place } from '../../domain/models/Place'
import { parseJsonToPlace } from '../helpers/parseJsonToPlace'
import { registerPlace } from '../../application/registerPlace'

const router = express()

router.post('/', async (req: Request, res: Response) => {
  try {
    const body: Record<string, unknown> = req.body || {}

    const placeRepository: PlaceRepository = new PrismaPlaceRepository()
    const place = new Place(parseJsonToPlace(body))
    const createdPlace = await registerPlace(place, placeRepository)
    res.json(createdPlace)
  } catch (e) {
    console.error(e)
    res.json({ error: 'Error creating the place' })
  }
})

export default router
