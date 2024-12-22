/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

export const handleValidationError = (error: any, res: Response) => {
  const issues = Object.values(error.errors).map((item: any) => {
    return {
      name: item.name,
      path: item.path,
      message: item.message,
    }
  })

  res.status(400).json({
    status: false,
    message: error.message,
    issues: issues,
    error,
  })
}
