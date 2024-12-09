import { Request, Response, Router } from "express";
import PostService from "./post.service";

const PostController = Router();

PostController.get("/", PostService.getAll);

PostController.post("/", async (req: Request, res: Response) => {
  const { user_id, title, content, image_path } = req.body;
    const postDTO = { user_id, title, content, image_path };
    const post = await PostService.create(postDTO);

  res.status(201).send(post);
});

PostController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await PostService.getOneById(+id);
  if (!post) {
    res.status(404).send("User not found");
  }

  res.send(post);
});

PostController.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id, title, content, image_path } = req.body;
    const postDTO = { user_id, title, content, image_path };
    const post = await PostService.update(+id, postDTO);

    if (!post) {
        res.status(404).send("User not found");
    }

    res.send(post);
   
    });

PostController.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await PostService.remove(+id);

    if (!post) {
        res.status(404).send("User not found");
    } 
    res.send(post);
});  

export default PostController;