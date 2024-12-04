import { UserType } from "../types/user.type";

const API_URL = "http://localhost:8000";

export const findAllUser = async () => {
  try {
    const response = await fetch(`${API_URL}/user`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs", error);
    throw error;
  }
};

export const findOneUserById = async (id: string) => {
  const response = await fetch(`${API_URL}/user/${id}`);
  const data = await response.json();
  return data;
};

export const createUser = async (credentials: UserType) => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur", error);
    throw error;
  }
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
