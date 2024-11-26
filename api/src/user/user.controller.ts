import { Router } from "express";
import UserService from "./user.service";

const UserController = Router();

UserController.get("/", UserService.getAll);
UserController.post("/", UserService.create);
UserController.get("/:id", UserService.getOneById);
UserController.get("/:id", UserService.update);
UserController.get("/:id", UserService.remove);

export default UserController;