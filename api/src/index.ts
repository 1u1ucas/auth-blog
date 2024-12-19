import express from "express";
import UserController from "./user/user.controller";
import logger from "./middleware/logger.middleware";
import AuthController from "./auth/auth.controller";
import PostController from "./post/post.controller";
import authMiddleware from "./middleware/auth.middleware";
import cors from "cors";
import { IUser } from "./user/user.types";

const app = express();
const port = 8000;

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

app.use(express.json());
app.use(cors());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", AuthController);
app.use("/users", authMiddleware, UserController);

app.use("/posts", PostController);

app.get("/private", authMiddleware, (req, res) => {
  res.send("Private route");
});

app.listen(port, () => {
});