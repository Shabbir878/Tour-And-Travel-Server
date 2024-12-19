/* eslint-disable prettier/prettier */
import mongoose from 'mongoose'
import { Tour } from '../Tour/tour.model'
import { IBooking } from './booking.interface'
import { Booking } from './booking.model'

const createBookingIntoDB = async (payload: IBooking): Promise<IBooking> => {
  //   const { tour, bookedSlots } = payload

  //   const requiredTour = await Tour.findById(tour)

  //   if (!requiredTour) {
  //     throw new Error('Tour not found')
  //   }

  //   const totalPrice = requiredTour.price * bookedSlots

  //   payload.totalPrice = totalPrice
  //   payload.bookingStatus = 'pending'

  //   if (requiredTour.availableSeats < bookedSlots) {
  //     throw new Error('Not enough seats available')
  //   }

  //   const booking = await Booking.create(payload)

  //   // availableSeats = availableSeats - bookedSlots
  //   const updatedTour = await Tour.findByIdAndUpdate(
  //     tour,
  //     { $inc: { availableSeats: -bookedSlots } },
  //     { new: true }
  //   )

  //   if (!updatedTour) {
  //     throw new Error('Failed to update tour')
  //   }

  //   return booking

  const session = await mongoose.startSession()

  session.startTransaction()

  try {
    const { tour, bookedSlots } = payload

    const requiredTour = await Tour.findById(tour)
    if (!requiredTour) {
      throw new Error('Tour not found')
    }

    const totalPrice = requiredTour.price * bookedSlots

    payload.totalPrice = totalPrice
    payload.bookingStatus = 'pending'

    if (requiredTour.availableSeats < bookedSlots) {
      throw new Error('Not enough seats available')
    }

    const booking = await Booking.create([payload], { session })

    const updatedTour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      { $inc: { availableSeats: -bookedSlots } },
      { new: true, session }
    )

    if (!updatedTour) {
      throw new Error('Failed to update tour')
    }

    await session.commitTransaction()
    await session.endSession()
    return booking[0]
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

const getBookingFromDB = async () => {
  const result = await Booking.find()
  return result
}

const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id)
  return result
}

/**
 *
 * Booking update -
 *
 * Booking cancel - Booking Model
 *
 * Tour AvailableSeats =   availableSeats + BookedSlot  - Tour Model
 *
 */

const updateBookingIntoDB = async (
  id: string,
  payload: Partial<IBooking>
): Promise<IBooking | null> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const booking = await Booking.findById(id).session(session)
    if (!booking) {
      throw new Error('Booking not found')
    }

    const { bookedSlots, tour, bookingStatus } = booking

    // Check if the booking is being cancelled and is not already cancelled
    if (
      payload.bookingStatus === 'cancelled' &&
      bookingStatus !== 'cancelled'
    ) {
      // Update the booking status to 'cancelled'
      booking.bookingStatus = 'cancelled'

      // Save the booking with the updated status
      await booking.save({ session })

      // Update the available seats of the associated tour
      const updatedTour = await Tour.findByIdAndUpdate(
        tour,
        { $inc: { availableSeats: bookedSlots } },
        { new: true, session }
      )

      if (!updatedTour) {
        throw new Error('Failed to update tour seats')
      }
    }

    // Commit the transaction if everything is successful
    await session.commitTransaction()
    session.endSession()

    return booking
  } catch (error) {
    // Abort the transaction if there's an error
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

export const BookingServices = {
  createBookingIntoDB,
  getBookingFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
}
