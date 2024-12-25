/* eslint-disable prettier/prettier */
import config from '../../config'
import { IUser } from '../User/user.interface'
import { User } from '../User/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (payload: IUser) => {
  const result = await User.create(payload)
  return result
}

const login = async (payload: { email: string; password: string }) => {
  // checking if the user exists
  const user = await User.findOne({ email: payload?.email }).select('+password')

  if (!user) {
    throw new Error('Invalid email')
  }

  // checking if the user is active
  const userStatus = user?.userStatus

  if (userStatus === 'inactive') {
    throw new Error('User is Blocked')
  }

  // checking if the password is correct
  const isPasswordCorrect = await bcrypt.compare(
    payload?.password,
    user?.password
  )

  if (!isPasswordCorrect) {
    throw new Error('Invalid password')
  }

  // create token & send to the user
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  const token = jwt.sign(jwtPayload, config.jwt_secret_key as string, {
    expiresIn: config.jwt_access_expires_in as string,
  })

  return { token, user }
}

export const AuthServices = {
  register,
  login,
}
