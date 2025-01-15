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
exports.JWT_SECRET = exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
exports.authRouter = express_1.default.Router();
exports.JWT_SECRET = process.env.JWT_SECRET || "secret";
exports.authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findFirst({ where: { email: email } });
        if (!user) {
            res.status(404).json({ message: "User not found, please signup" });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(409).json({ message: "Wrong password" });
            return;
        }
        const token = yield jsonwebtoken_1.default.sign({ id: user.id }, exports.JWT_SECRET, {
            expiresIn: "48h",
        });
        res.status(200).json({ message: "logged in successful", token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error " });
    }
}));
exports.authRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (yield prisma.user.findFirst({ where: { email: email } })) {
            res.status(400).json({ message: "Your email already exists" });
            return;
        }
        if (yield prisma.user.findFirst({ where: { username: username } })) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }
        const user = yield prisma.user.create({
            data: {
                username: username,
                email: email,
                password: yield bcrypt_1.default.hash(password, 10),
            },
        });
        const token = yield jsonwebtoken_1.default.sign({ id: user.id }, exports.JWT_SECRET, {
            expiresIn: "48h",
        });
        res.status(200).json({ message: "Signed up successfully", token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error " });
    }
}));
