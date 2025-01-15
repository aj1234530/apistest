"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRouter_1 = require("../routes/authRouter");
const authCheck = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        if (!token) {
            res.status(401).json({ message: " Unauthorised" });
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, authRouter_1.JWT_SECRET);
        req.userId = decode.id;
        next();
    }
    catch (error) {
        console.log(error);
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ message: "Access token has expired." });
            return;
        }
        if (error.name === "JsonWebTokenError") {
            res.status(401).json({ message: "Invalid access token." });
            return;
        }
        res.status(500).json({ message: "Internal server error." });
        return;
    }
};
exports.authCheck = authCheck;
