export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
created_at: Date;
}

export interface IUserDTO {
  username: string;
  email: string;
  password: string;
}