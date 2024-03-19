import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserModel } from './models/userModel'

require("dotenv").config();

const secret = process.env.JWT_SECRET as string;
// const expires = process.env.JWT_EXPIRES as any

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
secret,
    {
      expiresIn: '30d',
    }
  )
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (authorization) {
    const token = authorization.slice(7, authorization.length) // Bearer xxxxx
    const decode = jwt.verify(
      token,
secret,
    )
    req.user = decode as {
      _id: string;
      firstName: string;
      surName: string;
      otherName: string;
      userName: string;
      gender: string;
      image: string;
      voice: string;
      joined: Date;
      graduated: Date;
      level: string;
      slug: string;
      position: string;
      post: string;
      birthMonthDay: Date;
      phone: string;
      password: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
    next()
  } else {
    res.status(401).json({ message: 'No Token' })
  }
}

export const admin = async(req: Request, res: Response, next: NextFunction) => {
  const user = await UserModel.findOne({});
  if (user?.isAdmin === true){
    next();

  } else {
    return res
      .status(403)
      .json({ message: "You must have admin permissions." });
  }

};

