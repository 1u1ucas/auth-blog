import { Request, Response } from "express";
import pool from "../../config/database.config";
import { IUser, IUserDTO } from "./user.types";

const getAll = async (req: Request, res: Response) => {
  const query = "SELECT * FROM public.user";

  try {
    const result = await pool.query(query);
    const users = result.rows;

    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
}

const getOneByEmail = async (email: string): Promise<IUser | null> => {
  const query = "SELECT * FROM public.user WHERE email = $1";
  const values = [email];

  const result = await pool.query(query, values);
  const user = result.rows[0];

  if (!user) {
    return null;
  }

  return user;
};

const getOneById = async (id: number): Promise<IUser | null> => {
  const query = "SELECT * FROM public.user WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const create = async (userDTO: IUserDTO) => {
  const query = "INSERT INTO public.user (username, email, password) VALUES ($1, $2, $3)";
  const values = [userDTO.username, userDTO.email, userDTO.password];

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

const update = async (id: number, userDTO: IUserDTO) => {
  const query = "UPDATE public.user SET username = $1, email = $2, password = $3 WHERE id = $4";
  const values = [userDTO.username, userDTO.email, userDTO.password, id];

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
}

const remove = async (id: number) => {
  const query = "DELETE FROM public.user WHERE id = $1";
  const values = [id];

  try {
    await pool.query(query, values);

    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
} 

export default {
  getAll,
  getOneById,
  create,
  update,
  remove,
  getOneByEmail,
};