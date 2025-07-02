import type { Request, Response } from "express";
import User, { type UserType } from "../models/user";
import jwt from "jsonwebtoken";
import { type ObjectId } from "mongoose";

function generateToken(id: ObjectId) {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default", {
    expiresIn: "3d",
  });
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne<UserType>({ email });

    if (!user) {
      res.status(404).json({ message: "Invalid Email" });
      return;
    }
    if (!(await user.matchPassword(password))) {
      res.status(401).json({ message: "Invalid Password" });
      return;
    }

    const token = generateToken(user._id);
    res.status(200).json({ message: "Success", user, token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ message: "Email already used" });
      return;
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({ message: "Success", newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const authController = { login, register };

export default authController;
