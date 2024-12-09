import { useEffect, useState } from "react";
import { PostType } from "../../types/post.type";
import { createPost } from "../../service/post.service";

function CreatePost() {
  const [post, setPost] = useState<Partial<PostType>>({});
  const [message, setMessage] = useState<string>("");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!token) {
      setMessage("Vous devez être connecté pour créer un post.");
      return;
    }
    try {
      const user = JSON.parse(atob(token.split(".")[1]));
      const userId = user.id;
      setPost({ user_id: userId } as PostType);
    } catch (error) {
      setMessage("Token invalide ou expiré.");
    }
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) {
      setMessage("Vous devez être connecté pour créer un post.");
      return;
    }

    try {
      console.log("post : ", post);
      const data = await createPost(post as PostType);
      console.log(data);
      setPost({});
      setMessage("Post créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création du post", error);
      setMessage("Erreur lors de la création du post.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Créer un Post
        </h2>
        {message && (
          <div className="mb-4 text-center text-black-500">{message}</div>
        )}
        <form>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Titre
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Entrez le titre de votre post"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={post.title || ""}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Contenu
            </label>
            <textarea
              name="content"
              id="content"
              placeholder="Entrez le contenu de votre post"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={post.content || ""}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image_path"
              className="block text-sm font-medium text-gray-700"
            >
              lien vers l'image
            </label>
            <textarea
              name="image_path"
              id="image_path"
              placeholder="Entrez le chemin de votre image"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={post.image_path || ""}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={onSubmit}
          >
            Créer le Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
