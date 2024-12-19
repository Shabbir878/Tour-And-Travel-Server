/* eslint-disable prettier/prettier */
import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post('/create-user', UserControllers.createUser)
router.get('/:userId', UserControllers.getSingleUser)
router.patch('/:userId', UserControllers.updateUser)
router.delete('/:userId', UserControllers.deleteUser)
router.get('/', UserControllers.getUser)

export const userRoutes = router
