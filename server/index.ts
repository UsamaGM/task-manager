import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.route";
import { connectToDatabase } from "./src/config/db";
import projectRouter from "./src/routes/project.route";
import authMiddleware from "./src/middlewares/auth.middleware";
import taskRouter from "./src/routes/task.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/project", authMiddleware, projectRouter);
app.use("/api/task", authMiddleware, taskRouter);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
