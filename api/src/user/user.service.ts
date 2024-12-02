import { Request, Response } from "express";
import connection from "../../config/database.config";

const getAll = async (req: Request, res: Response) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving users from database");
    } else {
      res.send(results.rows);
    }
  });
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving user from database");
      } else {
        res.send(results.rows);
      }
    }
  );
}

const create = async (req: Request, res: Response) => {
  const { username, email, password, created_at } = req.body;
  connection.query(
    "INSERT INTO users (username, email, created_at) VALUES (?, ?, ?, ?)",
    [username, email, password, created_at],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving user in database");
      } else {
        const userId = result.rows[0].id;
        res.send({ id: userId, username, email });
  
    }
  });
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password, created_at } = req.body;
  connection.query(
    "UPDATE users SET username = ?, email = ?, password = ?, created_at = ? WHERE id = ?",
    [username, email, password, created_at, id],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating user in database");
      } else {
        res.send({ id, username, email });
      }
    }
  );
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting user from database");
      } else {
        res.send("User deleted successfully");
      }
    }
  );
}


export default {
  getAll,
  getOneById,
  create,
  update,
  remove
};