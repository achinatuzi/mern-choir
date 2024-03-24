import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Contact, ContactModel } from "../models/mailModel";
import { admin } from "../utils";

dotenv.config();

export const mailRouter = express.Router();

mailRouter.get(
  "/",
  admin,
  asyncHandler(async (req, res) => {
    const data = await ContactModel.find({});
    console.log(data);
    res.json(data);
  })
);

mailRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, name, text } = req.body;
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        service: "gmail",
        auth: {
          user: process.env.MAIL_HOST,
          pass: process.env.MAIL_PASS,
        },
      });
      const msg = {
        from: `${email}`,
        subject: `${name}`,
        to: `achinatuzi1@gmail.com`,
        text: `${text}`,
      };

      const info = await transporter.sendMail(msg);
      res.json({ msg: "Message Sent Successfully" });

      console.log(info.envelope.from);
    } catch (error) {
      res.status(404).json({ message: "Message Not Sent" });
    }
  })
);

mailRouter.post(
  "/upload",
  asyncHandler(async (req: Request, res: Response) => {
    const contact = await ContactModel.create({
      _id: req.body._id,
      fullname: req.body.fullname,
      email: req.body.email,
      text: req.body.text,
    } as Contact);
    console.log(contact);
    res.json({
      _id: contact._id,
      fullname: contact.fullname,
      email: contact.email,
      text: contact.text,
    });
    console.log(contact);
  })
);
