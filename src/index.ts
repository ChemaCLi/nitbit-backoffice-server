import express from 'express'
import placesRoutes from './modules/places/infrastructure/routes'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const swaggerUi = require('swagger-ui-express')
import * as openapi from './docs/openapi.json'

import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'
const app = express()
app.use(express.json())

// swagger auto generated docs
const theme = new SwaggerTheme()
const darkStyle = theme.getBuffer(SwaggerThemeNameEnum.DRACULA)
const options = {
  explorer: true,
  customCss: darkStyle,
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi, options))

app.use('/places', placesRoutes)

app.listen(3000, () => {
  console.info('Server running on http://localhost:3000')
})
