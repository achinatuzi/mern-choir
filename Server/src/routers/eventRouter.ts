import express, { Response, Request } from "express";
import { Event, EventModel } from "../models/eventModel";
import asyncHandler from "express-async-handler";
import { admin } from "../utils";
export const eventRouter = express.Router();

eventRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const events = await EventModel.find({});
    res.json(events);
  })
);

eventRouter.get(
  "/:_id",
  asyncHandler(async (req, res) => {
    const event = await EventModel.findById({ _id: req.params._id });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event Not Found" });
    }
  })
);

eventRouter.post(
  "/upload",
  asyncHandler(async (req: Request, res: Response) => {
    const event = await EventModel.create({
      _id: req.body._id,
      date: req.body.date,
      venue: req.body.venue,
      description: req.body.description,
      time: req.body.time,
      theme: req.body.theme,
    } as Event);
    res.json({
      _id: event._id,
      date: event.date,
      venue: event.venue,
      theme: event.theme,
      time: event.time,
      description: event.description,
    });
  })
);

eventRouter.put(
  "/:_id/update",
  admin,
  asyncHandler(async (req: Request, res: Response) => {
    const event = await EventModel.findById(req.params._id);
    console.log(event);
    if (event) {
      (event.theme = req.body.theme || event.theme),
        (event.venue = req.body.venue || event.venue),
        (event.description = req.body.description || event.description),
        (event.date = req.body.date || event.date),
        (event.time = req.body.time || event.time);

      const updatedEvent = await event.save();
      res.send({
        _id: updatedEvent._id,
        venue: updatedEvent.venue,
        theme: updatedEvent.theme,
        description: updatedEvent.description,
        date: updatedEvent.date,
        time: updatedEvent.time,
      });
      return;
    }

    res.status(404).json({ message: "Event not found" });
  })
);
