/* eslint-disable prettier/prettier */
/**
 * user --> id
 * tour --> id
 * bookedSlots
 * bookingStatus
 * totalPrice
 */

import mongoose from 'mongoose'

/**
 *
 * Bus - Dhaka - Cox's Bazar
 * 30 seat[Available Seats]
 *
 * 1 -> 4 tickets[1 family booked 4 tickets]
 *
 * 30 seat - 4 tickets = 26[remaining seats]
 *
 * 30 - 4 = 26[when pending show available seats]
 * 26 + 4 = 30[if cancelled, show available seats]
 *
 */

export interface IBooking {
  user: mongoose.Schema.Types.ObjectId
  tour: mongoose.Schema.Types.ObjectId
  bookedSlots: number
  bookingStatus: 'pending' | 'paid' | 'cancelled'
  totalPrice: number
}
