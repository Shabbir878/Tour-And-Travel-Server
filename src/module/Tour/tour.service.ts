/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ITour } from './tour.interface'
import { Tour } from './tour.model'

const createTourIntoDB = async (payload: ITour) => {
  const result = await Tour.create(payload)
  return result
}

// const getToursFromDB = async (query: Record<string, unknown>) => {
//   //{searTerm: "searchTerm"}
//   console.log('main', query)

//   const queryObj = { ...query }

//   const excludedFields = [
//     'searchTerm',
//     'page',
//     'sort',
//     'limit',
//     'sortOrder',
//     'sortBy',
//     'fields',
//   ]
//   excludedFields.forEach((el) => delete queryObj[el])

//   // searchQuery
//   const searchTerm = query?.searchTerm || ''
//   // 'name','starLocation','locations'
//   const searchableFields = ['name', 'startLocation', 'locations']
//   // const result = await Tour.find({
//   //   $or: [
//   //     { name: { $regex: searchTerm, $options: 'i' } },
//   //     { startLocation: { $regex: searchTerm, $options: 'i' } },
//   //     { locations: { $regex: searchTerm, $options: 'i' } },
//   //   ],
//   // })

//   const searchQuery = Tour.find({
//     $or: searchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   })

//   // filtering
//   const filteringQuery = searchQuery.find(queryObj)

//   // pagination
//   const page = Number(query?.page) || 1
//   const limit = Number(query?.limit) || 10
//   // skip = (page - 1)*limit
//   const skip = (page - 1) * limit

//   const paginatedQuery = filteringQuery.skip(skip).limit(limit)

//   // sorting
//   let sortStr

//   if (query?.sortBy && query?.sortOrder) {
//     const sortBy = query?.sortBy
//     const sortOrder = query?.sortOrder

//     sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
//   }

//   const result = await paginatedQuery.sort(sortStr)

//   //const result = await Tour.find()
//   return result
// }

const getToursFromDB = async (query: Record<string, unknown>) => {
  //{searterm: "searter"}
  console.log('main', query)

  const queryObj = { ...query }

  const excludingImportant = [
    'searchTerm',
    'page',
    'limit',
    'sortOrder',
    'sortBy',
    'fields',
  ]

  // jesob field amdr filtering a drkr nei sesob baad dicchi
  excludingImportant.forEach((key) => delete queryObj[key])

  console.log(queryObj)

  const searchTerm = query?.searchTerm || ''

  // "name", "startLocation", "locations"

  const searchableFields = ['name', 'startLocation', 'locations']

  // const result = await Tour.find({$or: [
  //   {name: {$regex: searchTerm, $options: "i"}},
  //   {startLocation: {$regex: searchTerm, $options: "i"}},
  //   {locations: {$regex: searchTerm, $options: "i"}}
  // ]})

  // const result = await Tour.find({$and:[{$or: searchableFields.map((field)=> ({[field]: {$regex: searchTerm, $options: "i"}}))}]},queryObj);
  const searchQuery = Tour.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  // filtering
  // const result = await searchQuery.find(queryObj);
  // const filterQuery = searchQuery.find(queryObj)
  const filterQuery = Object.keys(queryObj).length
    ? searchQuery.find(queryObj)
    : searchQuery

  // 1 -->10 {4-> 31-40
  // skip limit

  const page = Number(query?.page) || 1
  const limit = Number(query?.limit) || 10
  // skip = (page-1)*limit
  const skip = (page - 1) * limit

  // const result = await filterQuery.skip(skip).limit(limit)
  const paginatedQuery = filterQuery.skip(skip).limit(limit)

  let sortStr

  if (query?.sortBy && query?.sortOrder) {
    const sortBy = query?.sortBy
    const sortOrder = query?.sortOrder
    // "-price" othoba "price"
    sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
  }

  //const result = await paginatedQuery.sort(sortStr)
  const sortQuery = paginatedQuery.sort(sortStr)

  let fields = '-__v'

  if (query?.fields) {
    fields = query?.fields.toString().split(',').join(' ')
  }

  const result = await sortQuery.select(fields)

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
