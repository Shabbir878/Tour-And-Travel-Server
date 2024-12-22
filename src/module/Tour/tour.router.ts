/* eslint-disable prettier/prettier */
import express from 'express'
import { TourControllers } from './tour.controller'
import validateRequest from '../../middlewares/validateRequest'
import { tourValidationSchema } from './tour.validation'

const router = express.Router()

router.post(
  '/create-tour',
  validateRequest(tourValidationSchema),
  TourControllers.createTour
)
router.get('/', TourControllers.getTours)
router.get('/:id', TourControllers.getSingleTour)
router.patch('/:id', TourControllers.updateTour)
router.delete('/:id', TourControllers.deleteTour)
router.get('/schedule/:id', TourControllers.getNextSchedule)

export const tourRoutes = router
