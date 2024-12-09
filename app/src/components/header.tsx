import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  // Vérifier si un token JWT est stocké dans le localStorage
  const isLoggedIn = !!localStorage.getItem("jwtToken");

  // Gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Supprimer le token du localStorage
    navigate("/login"); // Rediriger vers la page de connexion
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-300">
            My Awesome Blog
          </Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-lg font-medium hover:text-blue-300 transition"
          >
            Home
          </Link>
          <Link
            to="/posts"
            className="text-lg font-medium hover:text-blue-300 transition"
          >
            Post
          </Link>
          <Link
            to="/createPost"
            className="text-lg font-medium hover:text-blue-300 transition"
          >
            Créer un post
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/account"
                className="text-lg font-medium hover:text-blue-300 transition"
              >
                Mon compte
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg font-medium hover:text-blue-300 transition"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-lg font-medium hover:text-blue-300 transition"
            >
              Se connecter
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
