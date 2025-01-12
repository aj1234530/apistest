"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
// console.log(process.env);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get("/ping", (req, res) => {
    res.send("okay");
});
app.post("/get/:url", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.params;
        console.log("received url:", url);
        const response = yield axios_1.default.get(url);
        console.log(response.data);
        res.status(200).json({
            status: response.status,
            data: response.data,
            headers: response.headers,
            config: response.config,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("something ups with server");
    }
}));
app.listen(PORT, () => console.log(`listening on ${process.env.DOMAIN}`));
