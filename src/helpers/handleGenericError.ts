/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const handleGenericError = (error: any, res: Response) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message,
    error,
  })
}
