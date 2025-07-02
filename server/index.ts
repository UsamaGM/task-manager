import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.route";
import { connectToDatabase } from "./src/config/db";
import authMiddleware from "./src/middlewares/auth.middleware";
import teamRouter from "./src/routes/team.route";
import projectRouter from "./src/routes/project.route";
import taskRouter from "./src/routes/task.route";
import userRouter from "./src/routes/user.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api/user", authMiddleware, userRouter);
app.use("/api/team", authMiddleware, teamRouter);
app.use("/api/project", authMiddleware, projectRouter);
app.use("/api/task", authMiddleware, taskRouter);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
