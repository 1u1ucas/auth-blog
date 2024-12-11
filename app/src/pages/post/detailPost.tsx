import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  findOnePostById,
  removePost,
  updatePost,
} from "../../service/post.service";
import FormInput from "../../components/formInput";

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [editingPost, setEditingPost] = useState<any>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<string>(""); // Ajouté pour la couleur du message
  const [userId, setUserId] = useState<number>(0);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await findOnePostById(id as string);
        setPost(data.post); // Assurez-vous que l'API renvoie un objet avec `post`
        setEditingPost(data.post); // Même logique pour l'édition
      } catch (error) {
        console.error("Erreur lors du chargement du post", error);
        setMessage("Erreur lors du chargement du post.");
        setMessageType("error"); // Message d'erreur
      }
    };

    fetchPost();

    if (token) {
      try {
        const user = JSON.parse(atob(token.split(".")[1]));
        setUserId(user.id);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
      }
    }
  }, [id, token]);

  const handleDelete = async () => {
    try {
      if (post.user_id !== userId) {
        setMessage("Vous n'êtes pas autorisé à supprimer ce post.");
        setMessageType("error"); // Message d'erreur
        return;
      }
      await removePost(id as string);
      navigate("/posts");
    } catch (error) {
      console.error("Erreur lors de la suppression du post", error);
      setMessage("Erreur lors de la suppression du post.");
      setMessageType("error"); // Message d'erreur
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEditingPost({ ...editingPost, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEdit = async () => {
    try {
      if (post.user_id !== userId) {
        setMessage("Vous n'êtes pas autorisé à modifier ce post.");
        setMessageType("error"); // Message d'erreur
        return;
      }
      const updated = await updatePost(id as string, editingPost);
      setPost(updated.post);

      setIsEditing(false);
      setMessage("Post modifié avec succès.");
      setMessageType("success");
    } catch (error) {
      console.error("Erreur lors de la modification du post", error);
      setMessage("Erreur lors de la modification du post.");
      setMessageType("error"); // Message d'erreur
    }
  };

  // Déterminer la classe CSS pour le message en fonction de son type (succès ou erreur)
  const messageClass =
    messageType === "error" ? "text-red-500" : "text-green-500";

  if (!post) {
    return <p className="text-center">Chargement...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {message && <p className={`text-center ${messageClass}`}>{message}</p>}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {!isEditing ? (
          <>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="mt-4 text-gray-600">{post.content}</p>
            {post.image_path && (
              <img
                src={post.image_path}
                alt="Post image"
                className="mt-4 rounded-lg"
              />
            )}
            <p className="mt-4 text-sm text-gray-500">
              Posté le {new Date(post.created_at).toLocaleDateString()}
            </p>
          </>
        ) : (
          <form>
            <FormInput
              label="Titre"
              type="text"
              placeholder="Modifier le titre"
              name="title"
              value={editingPost.title}
              onChange={handleChange}
            />
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Contenu
              </label>
              <textarea
                name="content"
                placeholder="Modifier le contenu"
                value={editingPost.content}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <FormInput
              label="Image URL"
              type="text"
              placeholder="Modifier l'URL de l'image"
              name="image_path"
              value={editingPost.image_path}
              onChange={handleChange}
            />
          </form>
        )}
      </div>
      {post.user_id === userId && (
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={handleDelete}
          >
            Supprimer
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={isEditing ? handleEdit : handleEditToggle}
          >
            {isEditing ? "Enregistrer" : "Modifier"}
          </button>
          {isEditing && (
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={handleEditToggle}
            >
              Annuler
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PostDetail;
