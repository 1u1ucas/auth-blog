import { useState } from "react";

import FormInput from "../components/formInput";
import { UserType } from "../types/user.type";
import { signin } from "../service/auth.service";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState<Partial<UserType>>({});
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = await signin(user as UserType);

      if (data.access_token) {
        // Stocker le token dans le localStorage
        localStorage.setItem("jwtToken", data.access_token);
        setMessage("Connexion réussie !");
      } else {
        setMessage("Erreur lors de la connexion.");
      }

      setUser({}); // Réinitialiser les champs du formulaire
      setMessage("Connexion réussie !");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur", error);
      setMessage("Erreur lors de la connexion.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Connexion
        </h2>
        {message && (
          <div
            className={`mb-4 text-center ${message.includes("réussie") ? "text-green-500" : "text-red-500"}`}
          >
            {message}
          </div>
        )}
        <form>
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Entrez votre email"
            onChange={handleChange}
            value={user.email || ""}
          />
          <FormInput
            label="Mot de passe"
            name="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            onChange={handleChange}
            value={user.password || ""}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={onSubmit}
          >
            Se connecter
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Pas encore inscrit ?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
