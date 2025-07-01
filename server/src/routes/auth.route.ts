import express from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.get("/verify", authMiddleware, (_, res) => {
  res.sendStatus(200);
});

export default authRouter;
