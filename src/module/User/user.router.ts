/* eslint-disable prettier/prettier */
import express from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { userValidationSchema } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(userValidationSchema),
  UserControllers.createUser
)
router.get('/:userId', UserControllers.getSingleUser)
router.patch('/:userId', UserControllers.updateUser)
router.delete('/:userId', UserControllers.deleteUser)
router.get('/', UserControllers.getUser)

export const userRoutes = router
