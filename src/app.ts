/* eslint-disable prettier/prettier */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express'
import { userRoutes } from './module/User/user.router'

import { StatusCodes } from 'http-status-codes'
import { tourRoutes } from './module/Tour/tour.router'
import { bookingRoutes } from './module/booking/booking.router'

const app = express()

// middleware
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/tour', tourRoutes)
app.use('/api/booking', bookingRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live',
  })
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message,
    error,
  })
})

export default app
