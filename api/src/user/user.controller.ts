import { Router } from "express";
import UserService from "./user.service";

const UserController = Router();

UserController.get("/", UserService.getAll);
UserController.post("/", UserService.create);
UserController.get("/:id", UserService.getOneById);
UserController.put("/:id", UserService.update);
UserController.delete("/:id", UserService.remove);


export default UserController;