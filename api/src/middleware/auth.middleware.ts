import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userService from "../user/user.service";

dotenv.config();

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).send("Token not found"); 
      return;
    }

    const tokenParts = token.split(" ");
    const access_token = tokenParts[1];

    jwt.verify(
      access_token,
      process.env.JWT_SECRET as string,
      async (err, decoded: any) => {

        if (!decoded?.exp || decoded.exp < Date.now() / 1000) {
          res.status(401).send("Token expired");
          return;
        }

        if (err) {
          res.status(401).send("Invalid token");
          return;
        }

        const user = await userService.getOneById(decoded.id);
        if (!user) {
          res.status(404).send("User not found");
          return;
        }

         const newExpirationTime = Math.floor(Date.now() / 1000) + 2 * 60 * 60;

        const newToken = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET as string,
          { expiresIn: "2h" }
        );

        res.setHeader("Authorization", `Bearer ${newToken}`);
        (req as any).user = user;


        next();
      }
    );
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default authMiddleware;
