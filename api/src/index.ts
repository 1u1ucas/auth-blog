import express, { Request, Response } from "express";
import LoggerService from "./middleware/logger.middleware";
import cors from "cors";

import UserController from "./user/user.controller";

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

app.use("/users", UserController);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});