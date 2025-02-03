import express from 'express'
import placesRoutes from './modules/places/infrastructure/routes'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const swaggerUi = require('swagger-ui-express')
import * as openapi from './docs/openapi.json' // Adjust the path as needed

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi))
app.use('/places', placesRoutes)

app.listen(3000, () => {
  console.info('Server running on http://localhost:3000')
})
