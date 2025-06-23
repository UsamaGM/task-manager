import express from "express";
import { getQueriedUsers } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/:query", getQueriedUsers);

export default userRouter;
