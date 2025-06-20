import type { NextFunction, Request, Response } from "express";
import type { UserType } from "../models/user";
import jwt from "jsonwebtoken";
import User from "../models/user";

export interface AuthRequest extends Request {
  user?: UserType;
}

export default async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.split(" ")[1]!;
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "default"
    ) as { id: string };

    req.user = (await User.findById(decodedToken.id).select(
      "-password"
    )) as UserType;

    next();
  } else {
    console.log("Unauthorized access declined: ", req.ip);
    res.sendStatus(401);
  }
}
