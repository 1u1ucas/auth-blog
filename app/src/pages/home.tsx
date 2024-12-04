function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold sm:text-5xl">My Awesome Blog</h1>
        <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
          Partagez vos idées, connectez-vous avec le monde, et découvrez
          l’inspiration à chaque coin de cet espace.
        </p>
      </header>
      <div className="flex space-x-4">
        <button
          className="px-6 py-3 text-lg font-semibold bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() => (window.location.href = "/login")}
        >
          Se connecter
        </button>
        <button
          className="px-6 py-3 text-lg font-semibold bg-blue-700 rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() => (window.location.href = "/signup")}
        >
          Créer un compte
        </button>
      </div>
    </div>
  );
}

export default Home;
