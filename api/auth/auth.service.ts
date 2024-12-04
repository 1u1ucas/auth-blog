import { Request, Response } from "express";
import pool from "./../config/database.config";

const signin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    res.send("Signin");
};

const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    res.send("Signup");
};

export default {
    signin,
    signup,
};