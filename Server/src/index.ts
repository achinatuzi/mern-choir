import express from "express";
import mongoose from "mongoose";
const cors = require("cors");
import { seedRouter } from "./routers/seedRouter";
import { eventRouter } from "./routers/eventRouter";
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter");
import { mailRouter } from "./routers/emailRouter";

const app = express();
dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use( cors());

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://gvcServer:cI5BP4ROOFGms4DP@gvc.ln1ctz9.mongodb.net/";
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(() => {
    console.log("error mongodb");
  });


app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/email", mailRouter)


const PORT: number = parseInt((process.env.PORT || "4000") as string, 10);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});

export default app;
