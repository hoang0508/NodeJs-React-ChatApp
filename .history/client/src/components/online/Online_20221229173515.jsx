import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./online.css";

export default function Online({ user }) {
  const [friends, setFriends] = useState([]);
  const socket = useRef();
  // const [onlineFriends, setOnlineFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    socket?.current?.emit("addUser", currentUser?._id);
    socket?.current?.on("getUsers", (users) => {
      const userCurrentMessOnline = currentUser?.followings.filter((item) =>
        users?.some((u) => u?.userId === item)
      );
      if (userCurrentMessOnline) setOnlineUsers(userCurrentMessOnline);
    });
  }, [currentUser?._id, currentUser?.followings]);

  console.log(onlineUsers);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentUser?._id);
      setFriends(res.data);
    };

    getFriends();
  }, [currentUser?._id]);

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={PF + user.profilePicture}
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
