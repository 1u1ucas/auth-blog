import { Request, Response, Router } from "express";
import PostService from "./post.service";
import authMiddleware from "../middleware/auth.middleware";

const PostController = Router();

const sendWithNewToken = (res: Response, data: object) => {
  const newToken = res.getHeader("Authorization")?.toString().split(" ")[1];

  if (newToken) {
    res.status(200).json({
      success: true,
      ...data,
      token: newToken,
    });
  } else {
    res.status(200).json({
      success: true,
      ...data,
    });
  }
};

PostController.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostService.getAll();
    sendWithNewToken(res, { posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching posts" });
  }
});

PostController.post("/", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { user_id, title, content, image_path } = req.body;
  const postDTO = { user_id, title, content, image_path };

  try {
    const created = await PostService.create(postDTO);
    if (created) {
      sendWithNewToken(res, { message: "Post created successfully" });
    } else {
      res.status(500).json({ success: false, message: "Error creating post" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Unknown error" });
  }
});

PostController.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const post = await PostService.getOneById(+id);
    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }
    sendWithNewToken(res, { post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching post" });
  }
});

PostController.put("/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, content, image_path } = req.body;

  try {
    const postCreator = await PostService.getCreatorById(+id);

    if (!postCreator || postCreator !== req.user?.id) {
      res.status(403).json({ success: false, message: "Unauthorized to update this post" });
      return;
    }

    const postDTO = { title, content, image_path, user_id: req.user.id };
    const updated = await PostService.update(+id, postDTO);

    if (!updated) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }

    sendWithNewToken(res, { post: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating post" });
  }
});

PostController.delete("/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const postCreator = await PostService.getCreatorById(+id);
    if (!postCreator || postCreator !== req.user?.id) {
      res.status(403).json({ success: false, message: "Unauthorized to delete this post" });
      return;
    }

    const deleted = await PostService.remove(+id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }

    sendWithNewToken(res, { message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting post" });
  }
});

export default PostController;
