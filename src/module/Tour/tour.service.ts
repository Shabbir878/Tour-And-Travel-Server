/* eslint-disable prettier/prettier */
import { ITour } from './tour.interface'
import { Tour } from './tour.model'

const createTourIntoDB = async (payload: ITour) => {
  const result = await Tour.create(payload)
  return result
}

const getToursFromDB = async () => {
  const result = await Tour.find()
  return result
}

const getSingleTourFromDB = async (id: string) => {
  const result = await Tour.findById(id)
  return result
}

const updateTourIntoDB = async (id: string, payload: Partial<ITour>) => {
  const result = await Tour.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteTourFromDB = async (id: string) => {
  const result = await Tour.findByIdAndDelete(id)
  return result
}

const getNextScheduleFromDB = async (id: string) => {
  // For instance
  //   const tour = await Tour.findById(id)
  //   const nextSchedule = tour?.getNextNearestStartDateAndEndDate()

  // For static
  const tour = await Tour.getNextNearestStartDateAndEndDate()

  return {
    tour,
    // nextSchedule,
  }
}

export const TourServices = {
  createTourIntoDB,
  getToursFromDB,
  getSingleTourFromDB,
  updateTourIntoDB,
  deleteTourFromDB,
  getNextScheduleFromDB,
}
