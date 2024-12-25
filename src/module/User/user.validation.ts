/* eslint-disable prettier/prettier */
import { z } from 'zod'

export const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Please provide your name' })
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be at most 50 characters long' }),

    age: z.number({ required_error: 'Please enter your age' }),

    email: z
      .string({ required_error: 'Please provide your email' })
      .email({ message: 'Please provide a valid email address' }),

    password: z.string({ required_error: 'Please provide your password' }),

    photo: z.string().optional(),

    role: z
      .enum(['user', 'admin'], {
        errorMap: () => ({ message: 'Role must be either "user" or "admin"' }),
      })
      .default('user'),

    userStatus: z
      .enum(['active', 'inactive'], {
        errorMap: () => ({
          message: 'User status must be either "active" or "inactive"',
        }),
      })
      .default('active'),
  }),
})

export const UserValidations = {
  userValidationSchema,
}
