import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { sampleUsers } from '../data'
import { UserModel } from '../models/userModel'

export const seedRouter = express.Router()

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {

    await UserModel.deleteMany({})
    const createdUsers = await UserModel.insertMany(sampleUsers)

    res.json({ createdUsers })
  })
)
