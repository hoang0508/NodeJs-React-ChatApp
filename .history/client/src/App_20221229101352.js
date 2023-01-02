import { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import Verity from "./pages/verity/Verity";

function App() {
  const { user } = useContext(AuthContext);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  console.log(pagination);
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
      <Route path="/auth-verity/:sdt" element={<Verity />}></Route>
    </Routes>
  );
}

export default App;