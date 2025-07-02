import express from "express";
import {
  getQueriedUsers,
  getUserById,
  getUserData,
  updateProfilePicture,
} from "../controllers/user.controller";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const userRouter = express.Router();

userRouter.put("/profile-picture", upload.single("profilePicture"), updateProfilePicture);
userRouter.get("/data", getUserData);
userRouter.get("/:id", getUserById);
userRouter.get("/search/:query", getQueriedUsers);

export default userRouter;
