/* eslint-disable prettier/prettier */
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'
import httpStatus from 'http-status-codes'

const createBooking = catchAsync(async (req, res) => {
  const body = req.body
  const result = await BookingServices.createBookingIntoDB(body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking Created successfully',
    data: result,
  })
})

const getBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getBookingFromDB()

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Bookings Retrieved successfully',
    data: result,
  })
})

const getSingleBooking = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await BookingServices.getSingleBookingFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Retrieved successfully',
    data: result,
  })
})

const updateBooking = catchAsync(async (req, res) => {
  const id = req.params.id
  const body = req.body

  const result = await BookingServices.updateBookingIntoDB(id, body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Updated successfully',
    data: result,
  })
})

export const BookingControllers = {
  createBooking,
  getBooking,
  getSingleBooking,
  updateBooking,
}
