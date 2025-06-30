import express from "express";
import { getQueriedUsers, getUserData } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/data", getUserData);
userRouter.get("/:query", getQueriedUsers);

export default userRouter;
