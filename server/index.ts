import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.route";
import { connectToDatabase } from "./src/config/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
