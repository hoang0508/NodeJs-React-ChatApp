import { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<>{user ? <Home /> : <Register />}</>}></Route>
      <Route
        path="/login"
        element={<>{user ? <Navigate replace to="/" /> : <Login />}</>}
      ></Route>
      <Route
        path="/register"
        element={<>{user ? <Navigate replace to="/" /> : <Register />}</>}
      ></Route>
      <Route path="/profile/:username" element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
