import { Router, Request, Response } from "express";
import { z } from "zod";
import { userMiddleware } from "../middleware/middleware";
import { Content } from "../database/db";
import contentSchema from "../types/content";
const contentRouter: any = Router();

type contentbodyType = z.infer<typeof contentSchema>;

contentRouter.post("/", userMiddleware, async (req: Request, res: Response) => {
  const { success, data } = contentSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "You sent the wrong intputs",
    });
  }

  const contentBody: contentbodyType = data;

  if (!req.userId) {
    return res.status(403).json({
      message: "User is not authenticated",
    });
  }

  await Content.create({
    link: contentBody.link,
    type: contentBody.type,
    title: contentBody.title,
    tags: [],
    userId: req.userId,
  });

  res.json({
    message: "Content added",
  });
});

export default contentRouter;
