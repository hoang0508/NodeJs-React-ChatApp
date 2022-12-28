import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { timeSince } from "../../util/ComvertTime";

export default function Message({ message, own, userCurrentMess }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  console.log(message, own);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            userCurrentMess.profilePicture
              ? PF + userCurrentMess.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt="useAvarta"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        {timeSince(new Date(message.createdAt))}
      </div>
    </div>
  );
}
