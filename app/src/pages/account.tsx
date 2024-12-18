import { useState, useEffect } from "react";
import { getUserAccount } from "../service/auth.service";
import { UserType } from "../types/user.type";

function Account() {
  const [user, setUser] = useState<UserType | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        const data = await getUserAccount();
        setUser(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du compte", error);
        setMessage("Impossible de charger les informations de votre compte.");
      }
    };

    fetchUserAccount();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Mon compte
        </h2>
        {message && (
          <div className="mb-4 text-center text-red-500">{message}</div>
        )}
        {user ? (
          <div>
            <div className="mb-4">
              <p className="text-gray-600 font-medium">Nom d'utilisateur :</p>
              <p className="text-gray-800">{user.username}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 font-medium">Email :</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 font-medium">Date de création :</p>
              <p className="text-gray-800">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Chargement des données...</p>
        )}
      </div>
    </div>
  );
}

export default Account;
