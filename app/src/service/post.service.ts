import { PostType } from "../types/post.type";

const API_URL = "http://localhost:8000";

// Fonction pour obtenir les headers d'authentification
const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.warn("Aucun token JWT trouvé dans le localStorage.");
  }
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Fonction pour gérer la réponse API
const handleResponse = async (response: Response) => {
  console.log("Réponse du serveur :", response);
  const responseText = await response.text();
  try {
    const responseData = JSON.parse(responseText);

    // Vérifiez si un nouveau token est présent dans les en-têtes de la réponse
    const newToken = response.headers.get("Authorization");
    if (newToken) {
      // Si un nouveau token est présent, le stocker dans le localStorage
      const token = newToken.split(" ")[1]; // Récupérer le token après "Bearer "
      localStorage.setItem("jwtToken", token);
      console.log("Nouveau token enregistré :", token);
    }

    if (!response.ok) {
      throw new Error(responseData.message || "Une erreur est survenue.");
    }
    return responseData; // Renvoie la réponse sous forme d'objet
  } catch (error) {
    console.error("Réponse du serveur (non-JSON) :", responseText);
    throw new Error(responseText || "Une erreur inattendue est survenue.");
  }
};

// Fonction pour récupérer tous les posts
export const findAllPost = async () => {
  const response = await fetch(`${API_URL}/posts`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// Fonction pour récupérer un post par ID
export const findOnePostById = async (id: string) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// Fonction pour récupérer les posts par ID d'utilisateur
export const findPostByUserId = async (id: string) => {
  const response = await fetch(`${API_URL}/posts/user/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// Fonction pour créer un post
export const createPost = async (credentials: PostType) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

// Fonction pour mettre à jour un post
export const updatePost = async (id: string, credentials: PostType) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

// Fonction pour supprimer un post
export const removePost = async (id: string) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};
