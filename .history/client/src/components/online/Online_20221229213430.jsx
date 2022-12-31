import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./online.css";

export default function Online({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, onlineUsers } = useContext(AuthContext);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
    setOnlineFriends(friendUserInclu);
  }, [friends, onlineUsers]);

  return (
    <>
      {onlineFriends &&
        onlineFriends.length > 0 &&
        onlineFriends.map((item) => (
          <li className="rightbarFriend" key={item?._id}>
            <div className="rightbarProfileImgContainer">
              <img
                className="rightbarProfileImg"
                src={
                  item?.profilePicture
                    ? PF + item?.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{item?.username}</span>
          </li>
        ))}
    </>
  );
}
