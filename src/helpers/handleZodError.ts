/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Response } from 'express'

export const handlerZodError = (error: any, res: Response) => {
  const issues = error.issues.map((item: any) => {
    return {
      path: item.path.join('>'),
      message: item.message,
    }
  })

  res.status(400).json({
    success: false,
    message: error.message,
    issues: issues,
    error: error,
  })
}
