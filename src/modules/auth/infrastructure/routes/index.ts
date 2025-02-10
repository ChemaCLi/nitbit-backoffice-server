import express from 'express'
import { signinEndpoint } from './signin'
import { signupEndpoint } from './signup'
import { verifyNewUserEndpoint } from './verify-signup'

const router = express()
router.use(signinEndpoint)
router.use(signupEndpoint)
router.use(verifyNewUserEndpoint)

export default router
