import express from 'express'
import { registerPlaceEndpoint } from './registerPlace'
import { findAllPlacesEndpoint } from './findAllPlaces'
import { findPlacesByState } from './findPlacesByState'

const router = express()
router.use(registerPlaceEndpoint)
router.use(findAllPlacesEndpoint)
router.use(findPlacesByState)

export default router
