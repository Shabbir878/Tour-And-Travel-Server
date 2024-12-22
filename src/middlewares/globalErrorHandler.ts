/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express'
import { handleGenericError } from '../helpers/handleGenericError'
import mongoose from 'mongoose'
import { handlerDuplicateError } from '../helpers/handleDuplicateError'
import { handleCastError } from '../helpers/handleCastError'
import { handleValidationError } from '../helpers/handleValidationError'
import { handlerZodError } from '../helpers/handleZodError'

//Error:
//Generic Error  - Done
//1.Duplicate - Done
//2. Validation - DOne
//3. Cast Error - Type Casting Error - Done
//4. Zod Error / Joi

type TErrorResponse = {
  success: boolean
  message: string
  error: any
}

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name && error.name === 'ZodError') {
    handlerZodError(error, res)
  } else if (error instanceof mongoose.Error.CastError) {
    handleCastError(error, res)
  } else if (error instanceof mongoose.Error.ValidationError) {
    handleValidationError(error, res)
  } else if (error.code && error.code === 11000) {
    handlerDuplicateError(error, res)
  } else if (error instanceof Error) {
    handleGenericError(error, res)
  }
}

// Error - string = err.message
// Error - Customize - Array, Object, String - JS Error

/**
 * JS Code
 *
 * error - JS Error -> customize -> new pattern of Error
 *
 * any error is a instance of Error Class of JS
 *
 */
