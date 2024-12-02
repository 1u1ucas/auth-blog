import { PostType } from "../types/post.type";


const API_URL = 'http://localhost:8000';

export const findAllPost = async () => {
  const response = await fetch(`${API_URL}/post`);
  const data = await response.json();
  return data;
};

export const findOnePostById = async (id: string) => {
  const response = await fetch(`${API_URL}/post/${id}`);
  const data = await response.json();
  return data;
};

export const findPostByUserId = async (id: string) => {
  const response = await fetch(`${API_URL}/post/user/${id}`);
  const data = await response.json();
  console.log("findPostByUserId data : ", data);
  return data;
}

export const createPost = async (credentials: PostType) => {
  const response = await fetch(`${API_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

export const updatePost = async (id: string, credentials: PostType) => {
  const response = await fetch(`${API_URL}/post/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

export const removePost = async (id: string) => {
  return await fetch(`${API_URL}/post/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};