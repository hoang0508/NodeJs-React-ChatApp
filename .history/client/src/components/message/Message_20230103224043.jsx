import "./message.scss";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import { BsThreeDots } from "react-icons/bs";
moment.locale("vi");

export default function Message({ message, own, userCurrentMess }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={own ? "message own" : "message"}>
      {own && <span className="message-you">Bạn</span>}
      <div className="messageTop">
        {!own ? (
          <img
            className="messageImg"
            src={
              userCurrentMess?.profilePicture
                ? PF + userCurrentMess?.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
        ) : (
          ""
        )}
        {!own && (
          <div>
            <BsThreeDots />
          </div>
        )}
        <div>
          {message?.image && (
            <div className="messenger-image">
              <img src={message?.image ? PF + message?.image : ""} alt="" />
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
