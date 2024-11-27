import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Authorization token is missing",
    });
  }
  const decoded = Jwt.verify(token as string, JWT_SECRET);

  if (decoded) {
    if (typeof decoded === "string") {
      return res.status(403).json({
        message: "You are not logged in ",
      });
    }
    req.userId = (decoded as JwtPayload).userId;
    next();
  } else {
    return res.status(403).json({
      message: "You are not logged in",
    });
  }
};
