import userService from "../user/user.service";
import { IUserDTO } from "../user/user.types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const signin = async (userDTO: IUserDTO) => {
  const user = await userService.getOneByEmail(userDTO.email);

  if (!user) {
    return null;
  }

  if (user.password !== userDTO.password) {
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
  return userService.create(userDTO);
};

const getUserAccount = async (token: string) => {
  const tokenParts = token.split(" ");
  const access_token = tokenParts[1];

  const decoded: any = jwt.verify(access_token, JWT_SECRET);

  return userService.getOneById(decoded.id);
}

export default {
  signin,
  signup,
  getUserAccount,
};