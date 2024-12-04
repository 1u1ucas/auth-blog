import { useState } from "react";

import FormInput from "../components/FormInput";
import { UserType } from "../types/user.type";
import { createUser } from "../service/user.service";

function Login() {
  const [user, setUser] = useState<Partial<UserType>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      alert("Veuillez remplir tous les champs");
      return;
    } else {
      createUser(user as UserType).then((data) => {
        alert("Utilisateur créé avec succès");
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Connexion
        </h2>
        <form>
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Entrez votre email"
            onChange={handleChange}
          />
          <FormInput
            label="Mot de passe"
            name="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            onChange={handleChange}
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
