import { useState, useEffect } from "react";
import { PostType } from "../../types/post.type";
import { findAllPost } from "../../service/post.service";
import { useNavigate } from "react-router-dom"; // Si vous utilisez react-router

function PostsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // Si vous utilisez react-router

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await findAllPost();
        setPosts(data.posts); // On s'assure de bien récupérer la liste des posts
      } catch (error) {
        console.error("Erreur lors du chargement des posts", error);
        setMessage("Erreur lors du chargement des posts.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`); // Utilisation de react-router pour la navigation
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Tous les Posts</h2>

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
