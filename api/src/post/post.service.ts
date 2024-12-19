import pool from "../../config/database.config";
import { IPost, IPostDTO } from "./post.types";

const getAll = async () => {
  const query = "SELECT * FROM public.post";

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Error fetching posts");
  }
};

const getOneById = async (id: number): Promise<IPost | null> => {
  const query = "SELECT * FROM public.post WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw new Error("Error fetching post by ID");
  }
};

const getByUserId = async (id: number): Promise<IPost[] | null> => {
  const query = "SELECT * FROM public.post WHERE user_id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching posts by user ID:", error);
    throw new Error("Error fetching posts by user ID");
  }
}

const getCreatorById = async (id: number): Promise<Number | null> => {
  const query = "SELECT user_id FROM public.post WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]?.user_id || null;
  } catch (error) {
    console.error("Error fetching post creator:", error);
    throw new Error("Error fetching post creator");
  }
};

const create = async (postDTO: IPostDTO) => {
  const query = "INSERT INTO public.post (user_id, title, content, image_path) VALUES ($1, $2, $3, $4)";
  const values = [postDTO.user_id, postDTO.title, postDTO.content, postDTO.image_path];

  try {
    await pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Error creating post");
  }
};

const update = async (id: number, postDTO: IPostDTO): Promise<IPost | false> => {
  const query = `
    UPDATE public.post
    SET title = $1, content = $2, image_path = $3
    WHERE id = $4 AND user_id = $5 RETURNING *;
  `;
  const values = [postDTO.title, postDTO.content, postDTO.image_path, id, postDTO.user_id];

  try {
    const result = await pool.query(query, values);
    if (!result.rowCount) return false;
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw new Error(`Error updating post with ID ${id}`);
  }
};


const remove = async (id: number) => {
  const query = "DELETE FROM public.post WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (!result.rowCount) return false;
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Error deleting post");
  }
};

export default {
  getAll,
  getOneById,
  getByUserId,
  getCreatorById,
  create,
  update,
  remove,
};
