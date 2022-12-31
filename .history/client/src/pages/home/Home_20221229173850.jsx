import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.scss";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
export default function Home() {
  // socket on
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

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
