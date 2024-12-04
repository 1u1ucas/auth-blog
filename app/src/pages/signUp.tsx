import { useState } from "react";

import FormInput from "../components/FormInput";
import { UserType } from "../types/user.type";
import { createUser } from "../service/user.service";

function SignUp() {
  const [user, setUser] = useState<Partial<UserType>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      alert("Veuillez remplir tous les champs");
      return;
    } else {
      console.log(user);
      try {
        const data = await createUser(user as UserType);
        alert("Utilisateur créé avec succès");
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur", error);
        alert("Erreur lors de la création de l'utilisateur");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Inscription
        </h2>
        <form>
          <FormInput
            label="Nom d'utilisateur"
            name="username"
            type="text"
            placeholder="Entrez votre nom d'utilisateur"
            onChange={handleChange}
            value={user.username}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Entrez votre email"
            onChange={handleChange}
            value={user.email}
          />
          <FormInput
            label="Mot de passe"
            name="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            onChange={handleChange}
            value={user.password}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={onSubmit}
          >
            S'inscrire
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Déjà un compte ?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
