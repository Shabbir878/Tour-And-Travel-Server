/* eslint-disable prettier/prettier */
import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    minLength: 3,
    maxLength: 50,
  },
  age: { type: Number, required: [true, 'Please enter your age'] },
  email: { type: String, required: [true, 'Please provide your email'] },
  photo: String,
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: '{VALUE} is not valid, please provide a valid role',
    },
    default: 'user',
    required: true,
  },
  userStatus: {
    type: String,
    enum: ['active', 'inactive'],
    required: true,
    default: 'active',
  },
})

// hook-->pre
// userSchema.pre('find', function (this, next) {
//   this.find({ userStatus: { $eq: 'active' } })
//   next()
// })

// hook-->post
// userSchema.post('find', function (docs, next) {
//   docs.forEach((doc: IUser) => {
//     doc.name = doc.name.toUpperCase()
//   })
// })

export const User = model<IUser>('User', userSchema)
