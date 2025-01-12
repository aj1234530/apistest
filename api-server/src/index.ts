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
// app.post("/get/:url", async (req: Request, res: Response) => {
//   try {
//     const { url } = req.params;
//     console.log("received url:", url);
//     const response = await axios.get(url);
//     console.log(response.data);
//     res.status(200).json({
//       status: response.status,
//       data: response.data,
//       headers: response.headers,
//       config: response.config,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("something ups with server");
//   }
// });

app.post("/get/:url", (req: Request, res: Response) => {
  const startTime = Date.now();
  const { url } = req.params;
  axios
    .get(url)
    .then(function (response) {
      //   console.log(response.data);
      //   console.log(response.status);
      //   console.log(response.statusText);
      //   console.log(response.headers);
      //   console.log(response.config);
      res.status(200).json({
        message: "Third party api is in range of 2xx",
        responseForTesters: {
          status: response.status,
          response: response.data,
          timeTaken: Date.now() - startTime,
          responseSize: JSON.stringify(response.data).length, //assuming 1char mean one byte
        },
      });
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log("code is here 1", error.response.data);
        // console.log("code is here 2", error.response.status);
        // console.log("code is here 3", error.response.headers);
        res
          .status(202)
          .json({ message: "Third party api is in range of not in 2xx" });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("4", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log("code is here 4", error.config);
    });
});

app.listen(PORT, () => console.log(`listening on ${process.env.DOMAIN}`));
