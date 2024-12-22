/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const handleCastError = (error: any, res: Response) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    status: false,
    message: error.message,
    error,
  })
}
