import { Router, Request, Response } from "express";
import signupBodySchema from "../types/signup";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "../db";
const userRouter: any = Router();

type signupBodyType = z.infer<typeof signupBodySchema>;

userRouter.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { success, data } = signupBodySchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error in inputs",
    });
  }
  const existingUser = await User.findOne({
    username: username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "User already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  await User.create({
    username: username,
    password: hashedPassword,
  });

  res.json({
    message: "Signed up",
  });
});

export default userRouter;
