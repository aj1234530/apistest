import express, { Request, Response } from "express";
import axios from "axios";
export const userRouter = express.Router();

userRouter.post("/save", (req: Request, res: Response) => {
  const { method, apiEndpoint, body, authorizationToken, authorizationType } = req.body;
});

userRouter.post("/request/:method/:url", (req: Request, res: Response) => {
  const startTime = Date.now();
  const { url, method } = req.params; //add types to the method
  const { bodyData, authorizationData } = req.body;
  const parsedBodyData = JSON.parse(bodyData); //will be sent to via axios
  try {
    axios({
      method: method,
      url: url,
      data: method === "GET" ? null : parsedBodyData,
      headers: {
        Authorization: `Bearer ${authorizationData}`,
      },
    })
      .then(function (response) {
        //these are metadata of response received
        // console.log("response data", response.data);
        // console.log("response status", response.status);
        // console.log("response text", response.statusText);
        // console.log("response headers", response.headers);
        // console.log("response config", response.config);
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
          res.status(202).json({
            message: "Third party api is in range of not in 2xx",

            responseForTesters: {
              status: error.response.status,
              response: error.response.data,
              timeTaken: Date.now() - startTime,
              responseSize: JSON.stringify(error.response.data)?.length,
            },
          });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("4th", error.request);
          res.status(202).json({
            message: "request to third party was made but no response received",
            responseForTesters: "no response recieved timedout",
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          res
            .status(500)
            .json({ messag: "Our server is Not responding retry" });
        }
        console.log("code is here 5 error", error.config);
      });
  } catch (error) {
    res.status(500).json({ messag: "Our server is Not responding retry" });
  }
});