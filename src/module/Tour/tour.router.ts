/* eslint-disable prettier/prettier */
import express from 'express'
import { TourControllers } from './tour.controller'

const router = express.Router()

router.post('/create-tour', TourControllers.createTour)
router.get('/', TourControllers.getTours)
router.get('/:id', TourControllers.getSingleTour)
router.patch('/:id', TourControllers.updateTour)
router.delete('/:id', TourControllers.deleteTour)
router.get('/schedule/:id', TourControllers.getNextSchedule)

export const tourRoutes = router
