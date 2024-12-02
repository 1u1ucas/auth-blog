import express, { Request, Response } from "express";
import LoggerService from "./middleware/logger.middleware";
import cors from "cors";

import UserController from "./user/user.controller";
import PostController from "./post/post.controller";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(    
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(LoggerService);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello !");
});

app.use("/user", UserController);
app.use("/post", PostController);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});