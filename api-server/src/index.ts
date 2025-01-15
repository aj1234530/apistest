import express, { Request, Response } from "express";
import { config } from "dotenv";

import cors from "cors";
import { authRouter } from "./routes/authRouter";
import { userRouter } from "./routes/userRouter";
require("dotenv").config();
// console.log(process.env);
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get("/ping", (req, res) => {
  res.send("okay");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () =>
  console.log(`listening on ${process.env.DOMAIN},${PORT}`)
);
