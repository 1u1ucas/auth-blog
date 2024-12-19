import { useState, useEffect } from "react";
import { PostType } from "../../types/post.type";
import { findAllPost, findPostByUserId } from "../../service/post.service";
import { useNavigate } from "react-router-dom";

function PostsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showUserPosts, setShowUserPosts] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Récupération du token et du userId au chargement du composant
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setUserId(user.id);
    }
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data =
        showUserPosts && userId
          ? await findPostByUserId(userId)
          : await findAllPost();
      setPosts(data.posts);
    } catch (error) {
      console.error("Erreur lors du chargement des posts", error);
      setMessage("Erreur lors du chargement des posts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [showUserPosts, userId]);

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  const toggleShowUserPosts = () => {
    setShowUserPosts((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        {showUserPosts ? "Mes Posts" : "Tous les Posts"}
      </h2>

      {userId && (
        <div className="text-center mb-6">
          <button
            onClick={toggleShowUserPosts}
            className={`px-4 py-2 rounded-lg ${
              showUserPosts
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            } transition`}
          >
            {showUserPosts ? "Voir tous les posts" : "Voir mes posts"}
          </button>
        </div>
      )}

      {isLoading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Chargement...</span>
          </div>
        </div>
      )}

      {message && !isLoading && (
        <p className="text-center text-red-500">{message}</p>
      )}

      <div className="space-y-4">
        {posts.length === 0 && !isLoading ? (
          <p className="text-center text-gray-500">
            Aucun post disponible pour le moment.
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="mt-2 text-gray-700">
                {post.content.substring(0, 150)}...
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Posté le {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostsPage;
