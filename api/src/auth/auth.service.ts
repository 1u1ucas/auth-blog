import userService from "../user/user.service";
import { IUserDTO } from "../user/user.types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const signin = async (userDTO: IUserDTO) => {
  const user = await userService.getOneByEmail(userDTO.email);

  if (!user) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(userDTO.password, user.password);
  if (!passwordMatch) {
    return null;
  }

  const access_token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return access_token;
};

const signup = async (userDTO: IUserDTO) => {
  const hashedPassword = await bcrypt.hash(userDTO.password, 10);

  const userWithHashedPassword = { ...userDTO, password: hashedPassword };

  return userService.create(userWithHashedPassword);
};

const getUserAccount = async (token: string) => {
  const tokenParts = token.split(" ");
  const access_token = tokenParts[1];

  const decoded: any = jwt.verify(access_token, JWT_SECRET);

  return userService.getOneById(decoded.id);
};

export default {
  signin,
  signup,
  getUserAccount,
};
