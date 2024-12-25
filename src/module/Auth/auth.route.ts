/* eslint-disable prettier/prettier */
import express from 'express'
import { AuthControllers } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { UserValidations } from '../User/user.validation'

const router = express.Router()

router.post(
  '/register',
  validateRequest(UserValidations.userValidationSchema),
  AuthControllers.register
)
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login
)

export const authRoutes = router
