import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authCheck } from "../middlewares/authCheck";
export const prisma = new PrismaClient();
export const authRouter = express.Router();
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      res.status(404).json({ message: "User not found, please signup" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(409).json({ message: "Wrong password" });
      return;
    }
    const token = await jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "48h",
    });
    res.status(200).json({ message: "logged in successful", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error " });
  }
});

authRouter.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    if (await prisma.user.findFirst({ where: { email: email } })) {
      res.status(400).json({ message: "Your email already exists" });
      return;
    }
    if (await prisma.user.findFirst({ where: { username: username } })) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10),
      },
    });
    const token = await jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "48h",
    });
    res.status(200).json({ message: "Signed up successfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error " });
  }
});

authRouter.post("/verify", authCheck, (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    res.status(500).json({ message: "Not Okay" });
  }
});
