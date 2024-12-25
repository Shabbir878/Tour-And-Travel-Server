/* eslint-disable prettier/prettier */

import config from '../config'
import { TUserRole } from '../module/User/user.interface'
import { User } from '../module/User/user.model'
import catchAsync from '../utils/catchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization
    // checking if the token is missing
    if (!token) {
      throw new Error('You are not Authorized')
    }

    // checking if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_secret_key as string
    ) as JwtPayload

    const { role, email } = decoded

    // checking if the user exists
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    // checking if the user is inactive
    const userStatus = user?.userStatus

    if (userStatus === 'inactive') {
      throw new Error('User is blocked')
    }

    // checking if the user has the required role
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not Authorized')
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
