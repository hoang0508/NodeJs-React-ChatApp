import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./online.css";

export default function Online({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, onlineUsers } = useContext(AuthContext);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentUser?._id);
      setFriends(res?.data);
    };

    getFriends();
  }, [currentUser?._id]);

  // online friend
  useEffect(() => {
    const friendUserInclu = friends?.filter((item) =>
      onlineUsers?.includes(item?._id)
    );
    console.log(
      "🚀 ~ file: Online.jsx:23 ~ useEffect ~ friendUserInclu",
      friendUserInclu
    );
  }, [friends, onlineUsers]);

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          // src={PF + user.profilePicture}
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
