import { PostType } from "../types/post.type";

const API_URL = "http://localhost:8000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  console.log("token : ", token);
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const findAllPost = async () => {
  const response = await fetch(`${API_URL}/posts`, {
    headers: getAuthHeaders(),
  });
  console.log("findAllPost response : ", response);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des posts");
  }
  const data = await response.json();
  return data;
};

export const findOnePostById = async (id: string) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  return data;
};

export const findPostByUserId = async (id: string) => {
  const response = await fetch(`${API_URL}/posts/user/${id}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  console.log("findPostByUserId data : ", data);
  return data;
};

export const createPost = async (credentials: PostType) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

export const updatePost = async (id: string, credentials: PostType) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

export const removePost = async (id: string) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return response;
};
