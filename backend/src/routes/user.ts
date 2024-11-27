import { Router, Request, Response } from "express";
import signupBodySchema from "../types/signup";
import { z } from "zod";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../database/db";
import signinBodySchema from "../types/signin";
import { JWT_SECRET } from "../config";
const userRouter: any = Router();

type signupBodyType = z.infer<typeof signupBodySchema>;

userRouter.post("/signup", async (req: Request, res: Response) => {
  const { success, data } = signupBodySchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error in inputs",
    });
  }
  const signupBody: signupBodyType = data;

  const existingUser = await User.findOne({
    username: signupBody.username,
  });

  if (existingUser) {
    return res.status(403).json({
      message: "User already exist with this username",
    });
  }

  const hashedPassword = await bcrypt.hash(signupBody.password, 5);

  await User.create({
    username: signupBody.username,
    password: hashedPassword,
  });

  res.json({
    message: "Signed up",
  });
});

type signinBodyType = z.infer<typeof signinBodySchema>;

userRouter.post("/signin", async (req: Request, res: Response) => {
  const signinBody: signinBodyType = req.body;
  const { success } = signinBodySchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      messge: "Error in inputs",
    });
  }
  const existingUser = await User.findOne({
    username: signinBody.username,
  });

  if (!existingUser) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }

  const passwordMatch = await bcrypt.compare(
    signinBody.password,
    existingUser.password
  );

  if (passwordMatch) {
    const token = Jwt.sign(
      {
        userId: existingUser._id,
      },
      JWT_SECRET
    );

    res.json({
      message: "You are signed in",
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Wrong credentials",
  });
});

export default userRouter;
