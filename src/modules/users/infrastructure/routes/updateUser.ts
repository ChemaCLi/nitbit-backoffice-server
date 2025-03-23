import express, { Response, Request } from 'express'
import { updateUser } from '../../application/services/updateUser'
import { validateUpdateUserInput } from '../validators/validateUpdateUserInput'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { PrismaUserRepository } from '../repositories/PrismaUserRepository'
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException'
import { InvalidUserDataException } from '../../domain/exceptions/InvalidUserDataException'

const router = express()

router.patch('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updateData = req.body

    await validateUpdateUserInput(updateData)

    const userRepository: UserRepository = new PrismaUserRepository()

    const updatedUser = await updateUser(id, updateData, userRepository)

    res.json({
      message: 'User updated successfully',
      data: {
        id: updatedUser.id.toString(),
        fullName: updatedUser.profile.fullName,
        email: updatedUser.profile.email.getValue(),
        phone: updatedUser.profile.phone.getValue(),
        onlineStatus: updatedUser.onlineStatus,
      },
    })
  } catch (e) {
    console.error(e)

    if (e instanceof UserNotFoundException) {
      res.status(404).json({ error: 'User not found', message: e.message })
      return
    }

    if (e instanceof InvalidUserDataException) {
      res.status(400).json({ error: 'Invalid user data', message: e.message })
      return
    }

    const validationErrors = (e.errors || []).join('. ')
    const message = e.errors?.length > 0 ? validationErrors : e.message

    res.status(500).json({ error: 'Error updating user', message })
  }
})

export const updateUserEndpoint = router
