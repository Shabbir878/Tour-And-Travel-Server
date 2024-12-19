/* eslint-disable prettier/prettier */

import { NextFunction, Request, RequestHandler, Response } from 'express'

const catchAsync = (func: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((error) => next(error))
  }
}

export default catchAsync

// function createOperation(func: (a: number, b: number) => number) {
//   return func
// }

// const add = createOperation((a, b) => a + b)
// const multiply = createOperation((a, b) => a * b)

// console.log(add(2, 3))
// console.log(multiply(2, 3))
