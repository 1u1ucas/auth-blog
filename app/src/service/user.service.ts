import { UserType } from "../types/user.type";


const API_URL = 'http://localhost:8000';

export const findAllUser = async () => {
  const response = await fetch(`${API_URL}/user`);
  const data = await response.json();
  return data;
};

export const findOneUserById = async (id: string) => {
  const response = await fetch(`${API_URL}/user/${id}`);
  const data = await response.json();
  return data;
};

export const createUser = async (credentials: UserType) => {
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (id: string, credentials: UserType) => {
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

export const removeUser = async (id: string) => {
  return await fetch(`${API_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};