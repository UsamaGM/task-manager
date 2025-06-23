import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
import User from "../models/user";

async function getQueriedUsers(req: AuthRequest, res: Response) {
  const { query } = req.params;
  const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
    query?.toLowerCase() || ""
  );

  try {
    const users = await User.find({
      $and: [
        { _id: { $ne: req.user?._id } },
        isEmail
          ? { email: { $regex: query, $options: "i" } }
          : { username: { $regex: query, $options: "i" } },
      ],
    })
      .limit(10)
      .select("_id username email")
      .lean();

    res.status(200).json(users);
  } catch (error) {
    console.log("/user/:query Error:", error);
    res.sendStatus(500);
  }
}

export { getQueriedUsers };
