import express from 'express'
import { registerPlaceEndpoint } from './registerPlace'
import { findAllPlacesEndpoint } from './findAllPlaces'
import { findPlacesByStateEndpoint } from './findPlacesByState'

const router = express()
router.use(registerPlaceEndpoint)
router.use(findAllPlacesEndpoint)
router.use(findPlacesByStateEndpoint)

export default router
