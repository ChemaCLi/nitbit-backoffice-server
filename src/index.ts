import express from 'express'
import v1Routes from './routes'
import { config } from './modules/shared/application/config'
import { ROUTES_ENUM } from './routes/ROUTES_ENUM'

const app = express()
app.use(express.json())

app.use('/api/v1/', v1Routes)

app.listen(config.app.REST_API_PORT, () => {
  console.info(
    `Server running on http://localhost:${config.app.REST_API_PORT}/${ROUTES_ENUM.v1.DOCS}`,
  )
})
