/* eslint-disable prettier/prettier */
import { TourServices } from './tour.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'

const createTour = catchAsync(async (req, res) => {
  const body = req.body
  const result = await TourServices.createTourIntoDB(body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Tours Created successfully',
    data: result,
  })
})

const getTours = catchAsync(async (req, res) => {
  const result = await TourServices.getToursFromDB()

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Tours Retrieved successfully',
    data: result,
  })
})

const getSingleTour = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await TourServices.getSingleTourFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Tour Retrieved successfully',
    data: result,
  })
})

const updateTour = catchAsync(async (req, res) => {
  const id = req.params.id
  const body = req.body
  const result = await TourServices.updateTourIntoDB(id, body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Tour Updated successfully',
    data: result,
  })
})

const deleteTour = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await TourServices.deleteTourFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Tour Deleted successfully',
    data: result,
  })
})

const getNextSchedule = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await TourServices.getNextScheduleFromDB(id)

  res.json({
    status: true,
    message: 'Next Tour Schedule Retrieved Successfully',
    data: result,
  })
})

export const TourControllers = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
