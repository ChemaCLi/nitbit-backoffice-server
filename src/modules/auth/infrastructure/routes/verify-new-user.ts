import express, { Response, Request } from 'express'
const router = express()

router.post('/verify', async (req: Request, res: Response) => {
  try {
    return
  } catch (e) {
    console.error(e)
    const validationErrors = (e.errors || []).join('. ')
    const message = e.errors?.length > 0 ? validationErrors : e.message

    res.statusCode = 500
    if (validationErrors) {
      res.statusCode = 400
    }
    res.json({ error: 'Error creating the place', message })
  }
})

export const verifyNewUserEndpoint = router
