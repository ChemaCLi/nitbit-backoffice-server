import express from 'express'
import placesRoutes from './modules/places/infrastructure/routes'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const swaggerUi = require('swagger-ui-express')
import * as openapi from './docs/openapi.json' // Adjust the path as needed

import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'

const theme = new SwaggerTheme()
const darkStyle = theme.getBuffer(SwaggerThemeNameEnum.DRACULA) // Getting a Style

const app = express()
app.use(express.json())

const options = {
  explorer: true,
  customCss: darkStyle, // Apply the 'dark' theme
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi, options))
app.use('/places', placesRoutes)

app.listen(3000, () => {
  console.info('Server running on http://localhost:3000')
})
