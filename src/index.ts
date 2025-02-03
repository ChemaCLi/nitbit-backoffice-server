import express from 'express'
import placesRoutes from './modules/places/infrastructure/routes'

const app = express()
app.use(express.json())
app.use(placesRoutes)

app.listen(3000, () => {
  console.info('Server running on http://localhost:3000')
})
