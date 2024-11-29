import { Router, Request, Response } from "express";
import { userMiddleware } from "../middleware/middleware";
import { Content, Link } from "../database/db";
import { random } from "../utils";
const brainRouter: any = Router();

brainRouter.post(
  "/share",
  userMiddleware,
  async (req: Request, res: Response) => {
    const share = req.body.share;

    if (share) {
      const hash = random(16);
      const existingLink = await Link.findOne({
        userId: req.userId,
      });
      if (existingLink) {
        return res.json({
          message: existingLink.hash,
        });
      }

      await Link.create({
        userId: req.userId,
        hash: hash,
      });
      res.json({
        hash: hash,
      });
    } else {
      await Link.deleteOne({
        userId: req.userId,
      });
      res.json({
        message: "Removed link",
      });
    }
  }
);

brainRouter.get("/:shareLink", async (req: Request, res: Response) => {
  const hash = req.params.shareLink;
  const link = await Link.findOne({
    hash,
  });
  if (!link) {
    return res.status(404).json({
      message: "Link not found",
    });
  }

  const content = await Content.find({
    userId: link.userId,
  }).populate("userId", "username");

  res.json({
    content,
  });
});

export default brainRouter;
