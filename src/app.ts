/* eslint-disable prettier/prettier */

import express, { Request, Response } from 'express'
import { userRoutes } from './module/User/user.router'

import { tourRoutes } from './module/Tour/tour.router'
import { bookingRoutes } from './module/booking/booking.router'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import { authRoutes } from './module/Auth/auth.route'

const app = express()

// middleware
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/tour', tourRoutes)
app.use('/api/booking', bookingRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live',
  })
})

app.use(globalErrorHandler)

export default app
