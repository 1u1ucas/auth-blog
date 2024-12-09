import { Request, Response } from "express";
import pool from "../../config/database.config";
import { IPost, IPostDTO } from "./post.types";

const getAll = async (req: Request, res: Response) => {
  const query = "SELECT * FROM public.post";

  try {
    const result = await pool.query(query);
    const posts = result.rows;

    res.send(posts);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send("Error fetching post");
  }
}

const getByUserId = async (user_id: string): Promise<IPost | null> => {
  const query = "SELECT * FROM public.post WHERE user_id = $1";
  const values = [user_id];

  try {
    const result = await pool.query(query, values);
    const post = result.rows[0];

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }

};

const getOneById = async (id: number): Promise<IPost | null> => {
  const query = "SELECT * FROM public.post WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    const post = result.rows[0];

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

const create = async (userDTO: IPostDTO) => {
  const query = "INSERT INTO public.post (user_id, title, content, image_path) VALUES ($1, $2, $3, $4)";
  const values = [userDTO.user_id, userDTO.title, userDTO.content, userDTO.image_path];

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error creating post:", error);
    return false;
  }
};

const update = async (id: number, userDTO: IPostDTO) => {
  const query = "UPDATE public.post SET user_id = $1, title = $2, content = $3, image_path = $4 WHERE id = $5";
  const values = [userDTO.user_id, userDTO.title, userDTO.content, userDTO.image_path, id];

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error updating post:", error);
    return false;
  }
}

const remove = async (id: number) => {
  const query = "DELETE FROM public.post WHERE id = $1";
  const values = [id];

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
} 

export default {
  getAll,
  getOneById,
  create,
  update,
  remove,
  getByUserId,
};