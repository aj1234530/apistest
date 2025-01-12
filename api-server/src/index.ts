import express, { Request, Response } from "express";
import axios from "axios";
import { config } from "dotenv";
require("dotenv").config();
// console.log(process.env);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/ping", (req, res) => {
  res.send("okay");
});
app.post("/get/:url", async (req: Request, res: Response) => {
  try {
    const { url } = req.params;
    console.log("received url:", url);
    const response = await axios.get(url);
    console.log(response.data);
    res.status(200).json({
      status: response.status,
      data: response.data,
      headers: response.headers,
      config: response.config,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("something ups with server");
  }
});

app.listen(PORT, () => console.log(`listening on ${process.env.DOMAIN}`));
