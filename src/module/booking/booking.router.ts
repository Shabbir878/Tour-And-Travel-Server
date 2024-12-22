/* eslint-disable prettier/prettier */

// create booking
// get all booking
// get booking by id
// get booking by user id = myBookings
// update booking
// delete booking = soft delete

import express from 'express'
import { BookingControllers } from './booking.controller'
import validateRequest from '../../middlewares/validateRequest'
import { bookingValidationSchema } from './booking.validation'

const router = express.Router()

router.post(
  '/create-booking',
  validateRequest(bookingValidationSchema),
  BookingControllers.createBooking
)
router.get('/', BookingControllers.getBooking)
router.get('/:id', BookingControllers.getSingleBooking)
router.patch('/:id', BookingControllers.updateBooking)

export const bookingRoutes = router
