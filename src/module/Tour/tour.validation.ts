/* eslint-disable prettier/prettier */
import { z } from 'zod'

export const tourValidationSchema = z.object({
  name: z.string().nonempty('Name is required.'),
  durationHours: z
    .number()
    .min(1, 'Duration must be at least 1 hour.')
    .nonnegative('Duration cannot be negative.'),
  averageRating: z
    .number()
    .min(0, 'Average rating cannot be less than 0.')
    .max(5, 'Average rating cannot be greater than 5.')
    .default(5), // Setting default value
  price: z
    .number()
    .positive('Price must be a positive number.')
    .nonnegative('Price cannot be negative.'),
  coverImage: z.string().url('Cover image must be a valid URL.'),
  images: z.array(z.string().url('Each image must be a valid URL.')),
  startDates: z.array(z.date()),
  startLocation: z.string().nonempty('Start location is required.'),
  locations: z.array(z.string().nonempty('Locations must be valid strings.')),
  slug: z.string().optional(),
  availableSeats: z
    .number()
    .min(1, 'Available seats must be at least 1.')
    .nonnegative('Available seats cannot be negative.'),
})

export const TourValidations = {
  tourValidationSchema,
}
