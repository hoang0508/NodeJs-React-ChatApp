import "./message.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { timeSince } from "../../util/ComvertTime";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import { AuthContext } from "../../context/AuthContext";
moment.locale("vi");

export default function Message({ message, own, userCurrentMess }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {userCurrentMess?.profilePicture !== currentUser?.profilePicture && (
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
          {message?.image !== "" && (
            <div className="messenger-image">
              <img src={PF + message?.image} alt="" />
            </div>
          )}
          <p className="messageText">{message.text}</p>
          <div className="messageBottom">
            {moment(message?.createdAt).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
}
