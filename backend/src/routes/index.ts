import { Router } from "express";
import userRouter from "./user";
import contentRouter from "./content";
const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/content", contentRouter);

export default mainRouter;
