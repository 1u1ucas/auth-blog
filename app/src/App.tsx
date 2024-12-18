import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";

import PostsPage from "./pages/post/allPost";
import PostDetail from "./pages/post/detailPost";
import CreatePost from "./pages/post/createPost";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Account from "./pages/account";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
