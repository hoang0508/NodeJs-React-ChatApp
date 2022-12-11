import { useContext } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<>{user ? <Home /> : <Register />}</>}></Route>
      <Route
        path="/login"
        element={<>{user ? <Link to="/" /> : <Login />}</>}
      ></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/profile/:username" element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
