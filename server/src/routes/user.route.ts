import express from "express";
import {
  getQueriedUsers,
  getUserById,
  getUserData,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/data", getUserData);
userRouter.get("/:id", getUserById);
userRouter.get("/search/:query", getQueriedUsers);

export default userRouter;
