import express from 'express'
import { registerPlaceEndpoint } from './registerPlace'
import { findAllPlacesEndpoint } from './findAllPlaces'

const router = express()
router.use(registerPlaceEndpoint)
router.use(findAllPlacesEndpoint)

export default router
