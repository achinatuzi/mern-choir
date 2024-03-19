import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User, UserModel } from "../models/userModel";
import { generateToken, isAuth } from "../utils";
import multer from "multer";
import { ImageModel } from "../models/imageModel";
import path from "path";

export const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ 
  storage: storage, 
  limits: { 
    fileSize: 30000000 ,
     fieldNameSize: 500,
    fieldSize: 30000000,
  },
  fileFilter: (req, file, callback) => {
      const acceptableExtensions = ['.png', '.jpg', '.jpeg'];
      if (!(acceptableExtensions.includes(path.extname(file.originalname)))) {
        return callback(new Error('...'));
      }}}
 );

 userRouter.get(
   "/",

   asyncHandler(async (req, res) => {
     const users = await UserModel.find({});
     res.json(users);
 
   })
 );

userRouter.post(
  "/upload",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const image = req.body.file;
        try {
          const result = await ImageModel.create({ image: image });
          res.json({ status: "ok", result });
        } catch (error) {
          res.json({ status: error });
        }
  })
);



userRouter.get(
  "/:_id",
  asyncHandler(async (req, res) => {
    const user = await UserModel.findOne({ _id: req.params._id });
    if (user) {
      res.json(user);
          console.log(user);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  })
);

// // POST /api/users/signin
userRouter.post(
  "/signin",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          otherName: user.otherName,
          surName: user.surName,
          gender: user.gender,
          graduated: user.graduated,
          slug: user.slug,
          voice: user.voice,
          level: user.level,
          joined: user.joined,
          birthMontDay: user.birthMonthDay,
          phone: user.phone,
          image: user.image,
          position: user.position,
          post: user.post,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).json({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  upload.single("image"),
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
      _id: req.body._id,
      userName: req.body.userName,
      firstName: req.body.firstName,
      otherName: req.body.otherName,
      surName: req.body.surName,
      gender: req.body.gender,
      graduated: req.body.graduated,
      voice: req.body.voice,
      level: req.body.level,
      slug: req.body.slug,
      joined: req.body.joined,
      birthMonthDay: req.body.birthMonthDay,
      phone: req.body.phone,
      image: req.body.image,
      position: req.body.position,
      post: req.body.post,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
      password: bcrypt.hashSync(req.body.password, 10),
    } as User);
    res.json({
      _id: user._id,
      userName: user.userName,
      firstName: user.firstName,
      otherName: user.otherName,
      surName: user.surName,
      gender: user.gender,
      graduated: user.graduated,
      voice: user.voice,
      level: user.level,
      slug: user.slug,
      joined: user.joined,
      birthMontDay: user.birthMonthDay,
      phone: user.phone,
      image: user.image,
      position: user.position,
      post: user.post,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.put(
  "/profile",
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.user._id);
    if (user) {
      (user.userName = req.body.userName || user.userName),
        (user.firstName = req.body.firstName || user.firstName),
        (user.otherName = req.body.otherName || user.otherName),
        (user.surName = req.body.surName || user.surName),
        (user.gender = req.body.gender || user.gender),
        (user.graduated = req.body.graduated || user.graduated),
        (user.voice = req.body.voice || user.voice),
        (user.level = req.body.level || user.level),
        (user.slug = req.body.slug || user.slug),
        (user.joined = req.body.joined || user.joined),
        (user.birthMonthDay = req.body.birthMonthDay || user.birthMonthDay),
        (user.phone = req.body.phone || user.phone),
        (user.image = req.body.image || user.image),
        (user.position = req.body.position || user.position),
        (user.post = req.body.post || user.post),
        (user.email = req.body.email || user.email);
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      if (user.position === "Alumni") {
        user.level === "";
      } else if (user.position === "Student") {
        user.graduated === "";
      } else {
        console.log(user.position);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        userName: updatedUser.userName,
        firstName: updatedUser.firstName,
        otherName: updatedUser.otherName,
        surName: updatedUser.surName,
        gender: updatedUser.gender,
        graduated: updatedUser.graduated,
        voice: updatedUser.voice,
        level: updatedUser.level,
        slug: updatedUser.slug,
        joined: updatedUser.joined,
        birthMontDay: updatedUser.birthMonthDay,
        phone: updatedUser.phone,
        image: updatedUser.image,
        position: updatedUser.position,
        post: updatedUser.post,
        email: updatedUser.email,
        token: generateToken(updatedUser),
      });
      return;
    }

    res.status(404).json({ message: "User not found" });
  })
);
