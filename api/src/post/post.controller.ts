import { Request, Response, Router } from "express";
import PostService from "./post.service";
import authMiddleware from "../middleware/auth.middleware";

const PostController = Router();

PostController.get("/", async (req: Request, res: Response): Promise<void> => {
  const posts = await PostService.getAll(req, res);
});

PostController.post("/", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { user_id, title, content, image_path } = req.body;
  const postDTO = { user_id, title, content, image_path };
  const post = await PostService.create(postDTO);

  res.status(201).send(post);
});

PostController.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const post = await PostService.getOneById(+id);
  if (!post) {
    res.status(404).send("Post not found");
    return;
  }
  res.send(post);
});

PostController.put("/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { user_id, title, content, image_path } = req.body;

  // Vérifiez que l'utilisateur connecté est l'auteur
  const postCreator = await PostService.getCreatorById(+id);
  if (!postCreator || postCreator !== req.user?.id.toString()) {
    res.status(403).send("Unauthorized to update this post");
    return;
  }

  const postDTO = { user_id, title, content, image_path };
  const updated = await PostService.update(+id, postDTO);

  if (!updated) {
    res.status(404).send("Post not found");
    return;
  }

  res.send("Post updated successfully");
});

PostController.delete("/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const postCreator = await PostService.getCreatorById(+id);
  if (!postCreator || postCreator !== req.user?.id.toString()) {
    res.status(403).send("Unauthorized to delete this post");
    return;
  }

  const deleted = await PostService.remove(+id);

  if (!deleted) {
    res.status(404).send("Post not found");
    return;
  }

  res.send("Post deleted successfully");
});

export default PostController;
