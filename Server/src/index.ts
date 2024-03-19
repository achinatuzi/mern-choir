import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import { seedRouter } from "./routers/seedRouter";
import { userRouter } from "./routers/userRouter";
import { eventRouter } from "./routers/eventRouter";
const bodyparser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

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

  
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

app.use(cors());
app.use(function (req, res, next) {
    //Enabling CORS
    res.setHeader(
      "Access-Control-Allow-Origin",
      "http://localhost:5173"
      // "https://choir-mern-frontend.vercel.app"
    );
      res.setHeader("Access-Control-Allow-Credentials", 'true');
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });





const PORT: number = parseInt((process.env.PORT || "4000") as string, 10);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
