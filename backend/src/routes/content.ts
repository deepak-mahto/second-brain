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

contentRouter.get("/", userMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  const content = await Content.find({
    userId: userId,
  }).populate("userId", "username");

  res.json({
    content,
  });
});

contentRouter.delete(
  "/:contentId",
  userMiddleware,
  async (req: Request, res: Response) => {
    const contentId = req.params.contentId;

    await Content.deleteOne({
      _id: contentId,
      userId: req.userId,
    });

    res.json({
      message: "Deleted",
    });
  }
);

export default contentRouter;
