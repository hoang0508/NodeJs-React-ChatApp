import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import { io } from "socket.io-client";

const App = () => {
  const socket = useRef();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>{!user ? <Navigate to="/login" replace={true} /> : <Home />}</>
        }
      ></Route>
      <Route
        path="/login"
        element={<>{user ? <Navigate to="/" replace={true} /> : <Login />}</>}
      ></Route>
      <Route
        path="/register"
        element={
          <>
            <Register />
          </>
        }
      ></Route>

      <Route
        path="/messenger"
        element={<>{!user ? <Navigate replace to="/" /> : <Messenger />}</>}
      ></Route>
      <Route path="/profile/:username" element={<Profile />}></Route>
    </Routes>
  );
};

export default App;
