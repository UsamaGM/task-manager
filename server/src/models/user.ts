import { CryptoHasher } from "bun";
import mongoose, { type ObjectId } from "mongoose";
import * as bcrypt from "bcrypt";
import type { ProjectType } from "./project";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    projects: {
      type: Array<mongoose.Types.ObjectId>,
      ref: "Projects",
      default: [],
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.getRandomValues(new Uint8Array(32)).toString();
  this.passwordResetToken = CryptoHasher.hash("sha256", resetToken, "hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("Users", userSchema);
export default User;

export interface UserType {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  projects: Array<ProjectType | ObjectId>;
  createdAt: Date;
  updatedAt: Date;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  profilePicture: string;
}
