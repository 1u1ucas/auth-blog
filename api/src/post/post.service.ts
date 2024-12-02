import { Request, Response } from "express";
import connection from "../../config/database.config";

const getAll = async (req: Request, res: Response) => {
  connection.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving posts from database");
    } else {
      res.send(results.rows);
    }
  });
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM posts WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving post from database");
      } else {
        res.send(results.rows);
      }
    }
  );
}

const getByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  connection.query(
    "SELECT * FROM posts WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving posts from database");
      } else {
        res.send(results.rows);
      }
    }
  );
}

const create = async (req: Request, res: Response) => {
  const { title, content, user_id, created_at, image_path } = req.body;
  connection.query(
    "INSERT INTO posts (title, content, user_id, created_at, image_path) VALUES (?, ?, ?, ?, ?)",
    [title, content, user_id, created_at, image_path],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving post in database");
      } else {
        const postId = result.rows[0].id;
        res.send({ id: postId, title, content, user_id, created_at, image_path });
      }
    }
  );
  
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, user_id, created_at, image_path } = req.body;
  connection.query(
    "UPDATE posts SET title = ?, content = ?, user_id = ?, created_at = ?, image_path = ? WHERE id = ?",
    [title, content, user_id, created_at, image_path, id],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating post in database");
      } else {
        res.send({ id, title, content, user_id, created_at, image_path });
      }
    }
  );
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM posts WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting post from database");
      } else {
        res.send("Post deleted successfully");
      }
    }
  );
}


export default {
  getAll,
  getOneById,
  getByUserId,
  create,
  update,
  remove,
};