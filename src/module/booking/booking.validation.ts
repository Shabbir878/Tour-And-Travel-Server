/* eslint-disable prettier/prettier */
import { z } from 'zod'

export const bookingValidationSchema = z.object({
  body: z.object({
    user: z.string().nonempty('User ID is required.'), // Assuming ObjectId is passed as a string
    tour: z.string().nonempty('Tour ID is required.'), // Assuming ObjectId is passed as a string
    bookedSlots: z
      .number()
      .int('Booked slots must be an integer.')
      .positive('Booked slots must be greater than 0.')
      .nonnegative('Booked slots cannot be negative.'),
    bookingStatus: z.enum(['pending', 'paid', 'cancelled']).default('pending'),
    totalPrice: z
      .number()
      .positive('Total price must be greater than 0.')
      .nonnegative('Total price cannot be negative.'),
  }),
})

export const BookingValidations = { bookingValidationSchema }
