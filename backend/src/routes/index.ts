import { Router } from "express";
import userRouter from "./user";
import contentRouter from "./content";
import brainRouter from "./brain";
const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/content", contentRouter);
mainRouter.use("/brain", brainRouter);

export default mainRouter;
