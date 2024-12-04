import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signUp";

function App() {
  return (
    <BrowserRouter>
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
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
