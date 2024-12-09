import { Request, Response, Router } from "express";
import UserService from "./user.service";

const UserController = Router();

UserController.get("/", UserService.getAll);

UserController.post("/", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const userDTO = { username, email, password };
  const user = await UserService.create(userDTO);

  res.status(201).send(user);
});

UserController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getOneById(+id);
  if (!user) {
    res.status(404).send("User not found");
  }

  res.send(user);
});

UserController.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const userDTO = { username, email, password };
    const user = await UserService.update(+id, userDTO);
    
    if (!user) {
        res.status(404).send("User not found");
    }
    
    res.send(user);
    });

UserController.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.remove(+id);
    
    if (!user) {
        res.status(404).send("User not found");
    }
    
    res.send(user);
    }
    );


export default UserController;