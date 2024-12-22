/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const handlerDuplicateError = (error: any, res: Response) => {
  res.status(StatusCodes.CONFLICT).json({
    status: false,
    message: error.message,
    error,
  })
}
