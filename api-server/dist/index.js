"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
// console.log(process.env);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/ping", (req, res) => {
    res.send("okay");
});
app.post("/:method/:url", (req, res) => {
    const startTime = Date.now();
    const { url, method } = req.params; //add types to the method
    const { bodyData, authorizationData } = req.body;
    const parsedBodyData = JSON.parse(bodyData); //will be sent to via axios
    try {
        (0, axios_1.default)({
            method: method,
            url: url,
            data: method === "GET" ? null : parsedBodyData,
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Key": "your-rapidapi-key",
                "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
                Authorization: `Bearer ${authorizationData} sdfls`,
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
            var _a;
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
                        responseSize: (_a = JSON.stringify(error.response.data)) === null || _a === void 0 ? void 0 : _a.length,
                    },
                });
            }
            else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log("4th", error.request);
                res.status(202).json({
                    message: "request to third party was made but no response received",
                    responseForTesters: "no response recieved timedout",
                });
            }
            else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                res
                    .status(500)
                    .json({ messag: "Our server is Not responding retry" });
            }
            console.log("code is here 5 error", error.config);
        });
    }
    catch (error) {
        res.status(500).json({ messag: "Our server is Not responding retry" });
    }
});
app.listen(PORT, () => console.log(`listening on ${process.env.DOMAIN},${PORT}`));
