"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRouter_1 = require("./routes/authRouter");
const userRouter_1 = require("./routes/userRouter");
require("dotenv").config();
// console.log(process.env);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/ping", (req, res) => {
    res.send("okay");
});
app.use("/api/v1/user", userRouter_1.userRouter);
app.use("/api/v1/auth", authRouter_1.authRouter);
app.listen(PORT, () => console.log(`listening on ${process.env.DOMAIN},${PORT}`));
