import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { findOnePostById } from "../../service/post.service"; // Importez votre fonction pour récupérer un post

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await findOnePostById(id as string); // Appel à votre service pour récupérer un post spécifique
        setPost(data);
      } catch (error) {
        console.error("Erreur lors du chargement du post", error);
        setMessage("Erreur lors du chargement du post.");
      }
    };

    fetchPost();
  }, [id]);

  if (message) {
    return <p className="text-center text-red-500">{message}</p>;
  }

  if (!post) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="mt-4 text-gray-600">{post.content}</p>
        <img src={post.image_path} alt="" />
        <p className="mt-4 text-sm text-gray-500">
          Posté le {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default PostDetail;
