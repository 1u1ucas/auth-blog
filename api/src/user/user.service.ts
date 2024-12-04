import { Request, Response } from "express";
import pool from "../../config/database.config";


const getAll = async (req: Request, res: Response) => {
  pool.query("SELECT * FROM users", (err, results) => {
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
  pool.query(
    "SELECT * FROM users WHERE id = $1",
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
  const { username, email, password } = req.body;
  pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
    [username, email, password],
    (err, result) => {
      if (err) {
        console.log("err", err);
        res.status(500).send("Error saving user in database");
      } else {
        const userId = result.rows[0].id;
        res.send({id: userId});
  
    }
  });
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  pool.query(
    "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $5",
    [username, email, password, id],
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
  pool.query(
    "DELETE FROM users WHERE id = $1",
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