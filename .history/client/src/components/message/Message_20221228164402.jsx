import "./message.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { timeSince } from "../../util/ComvertTime";
import moment from "moment";

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
        {userCurrentMess?.profilePicture && (
          <img
            className="messageImg"
            src={
              userCurrentMess?.profilePicture
                ? PF + userCurrentMess?.profilePicture
                : ""
            }
            alt=""
          />
        )}
        <div>
          <div className="messenger-image">
            <img src={PF + message?.image} alt="" />
          </div>
          <p className="messageText">{message.text}</p>
          <div className="messageBottom">
            {moment().format(message.createdAt).localeCompare("vi-VI")}
          </div>
        </div>
      </div>
    </div>
  );
}
