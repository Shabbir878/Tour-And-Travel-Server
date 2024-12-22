/* eslint-disable prettier/prettier */
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { StatusCodes } from 'http-status-codes'

const createUser = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await UserServices.createUserIntoDB(payload)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const getUser = catchAsync(async (req, res) => {
  const result = await UserServices.getUserFromDB()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users getting successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const result = await UserServices.getSingleUserFromDB(userId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User getting successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const body = req.body
  const result = await UserServices.updateUserIntoDB(userId, body)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Updated Successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  await UserServices.deleteUserFromDB(userId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Deleted Successfully',
    data: {},
  })
})

export const UserControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
