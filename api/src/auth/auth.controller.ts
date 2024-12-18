import { Request, Response, Router } from "express";
import AuthService from "./auth.service";

const AuthController = Router();

AuthController.post("/signin", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const userDTO = { username, email, password };

  const access_token = await AuthService.signin(userDTO);

  if (access_token) {
    res.status(200).send({ access_token });
  } else {
    res.status(401).send({ message: "User not authenticated" });
  }
});
AuthController.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const userDTO = { username, email, password };

  const result = await AuthService.signup(userDTO);

  if (result) {
    res.status(201).send({ message: "User created" });
  } else {
    res.status(400).send({ message: "User not created" });
  }
});

AuthController.get("/account", async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("Token not found");
    return;
  }

  const user = await AuthService.getUserAccount(token);

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(401).send("User not found");
  }
});

export default AuthController;