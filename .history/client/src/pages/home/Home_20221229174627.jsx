import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.scss";
import { useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
export default function Home() {
  const socket = useRef();
  const { user: currentUser, setOnlineUsers } = useContext(AuthContext);
  // socket on

  useEffect(() => {
    socket?.current?.emit("addUser", currentUser?._id);
    socket?.current?.on("getUsers", (users) => {
      const userCurrentMessOnline = currentUser?.followings.filter((item) =>
        users?.some((u) => u?.userId === item)
      );
      if (userCurrentMessOnline) setOnlineUsers(userCurrentMessOnline);
    });
  }, [currentUser?._id, currentUser?.followings, setOnlineUsers]);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
