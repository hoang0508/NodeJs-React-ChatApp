import "./message.scss";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import { BsThreeDots } from "react-icons/bs";
import useClickOutSide from "../../hooks/UseClickOutSide";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
moment.locale("vi");

export default function Message({ message, own, userCurrentMess }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { nodeRef, setShow, show } = useClickOutSide();
  const { messages, setMessages } = useContext(AuthContext);

  const handleRemoveMessen = async (dataMessen) => {
    await axios.delete(`/messages/${dataMessen?._id}`, {
      data: {
        sender: dataMessen?.sender,
      },
    });
    const dataFilterMess =
      message &&
      message.length > 0 &&
      message.filter((item) => item?._id !== dataMessen?._id);
  };
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
        {own && (
          <div className="messenger-dots">
            <span onClick={() => setShow(!show)}>
              <BsThreeDots />
            </span>
            {show && (
              <div
                className="messenger-dots--remove"
                onClick={() => handleRemoveMessen(message)}
              >
                Thu hồi tin nhắn
              </div>
            )}
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
