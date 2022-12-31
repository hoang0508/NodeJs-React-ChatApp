import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./online.css";

export default function Online({ user }) {
  const [friends, setFriends] = useState([]);
  // const [onlineFriends, setOnlineFriends] = useState([]);
  const { user: currentUser, onlineUsers } = useContext(AuthContext);
  console.log("🚀 ~ file: Online.jsx:10 ~ Online ~ onlineUsers", onlineUsers);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
