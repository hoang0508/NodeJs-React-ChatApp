import "./message.scss";
import { useContext } from "react";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import { AuthContext } from "../../context/AuthContext";
moment.locale("vi");

export default function Message({ message, own, userCurrentMess }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  console.log(userCurrentMess?.profilePicture !== currentUser?.profilePicture);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            // userCurrentMess?.profilePicture &&
            userCurrentMess?._id !== currentUser?._id
              ? PF + userCurrentMess?.profilePicture
              : ""
          }
          alt=""
        />

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
