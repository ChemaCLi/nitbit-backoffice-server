import express from 'express'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const swaggerUi = require('swagger-ui-express')
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'
import * as openapi from '../docs/openapi.json'
import placesRoutes from '../modules/places/infrastructure/routes'

const router = express()

// swagger auto generated docs
const theme = new SwaggerTheme()
const darkStyle = theme.getBuffer(SwaggerThemeNameEnum.DRACULA)
const options = {
  explorer: true,
  customCss: darkStyle,
}

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi, options))
router.use('/places', placesRoutes)

export default router
