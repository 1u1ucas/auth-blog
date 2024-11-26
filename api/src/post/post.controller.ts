import { Router } from "express";
import PostService from "./post.service";

const PostController = Router();

PostController.get("/", PostService.getAll);
PostController.post("/", PostService.create);
PostController.get("/:id", PostService.getOneById);
PostController.get("/user/:user_id", PostService.getByUserId);
PostController.get("/:id", PostService.update);
PostController.get("/:id", PostService.remove);

export default PostController;