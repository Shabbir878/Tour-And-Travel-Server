/* eslint-disable prettier/prettier */
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

const register = catchAsync(async (req, res) => {
  const result = await AuthServices.register(req.body)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User logged in successfully',
    token: result.token,
    data: result.user,
  })
})

export const AuthControllers = {
  register,
  login,
}
