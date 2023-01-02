import "./messenger.scss";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Message from "../../components/message/Message";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { BiInfoCircle } from "react-icons/bi";
import { FiPhoneCall, FiVideo } from "react-icons/fi";

export default function Messenger() {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user: currentUser, conversations } = useContext(AuthContext);
  const [userCurrentMess, setUserCurrentMess] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      textMessenger: "",
    },
  });

  // get messenger
  useEffect(() => {
    const fetchMessenger = async () => {
      const res = await axios.get(`/messages/${currentChat?._id}`);
      setMessages(res?.data);
    };
    fetchMessenger();
  }, [currentChat?._id]);

  // get messenger user current
  useEffect(() => {
    const friendId =
      currentChat && currentChat?.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        if (friendId) {
          const res = await axios("/users?userId=" + friendId);
          setUserCurrentMess(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentChat, currentChat?.members, currentUser._id]);

  // post messenger
  const handleSendMessenger = async (values) => {
    const newMessenger = {
      text: values.textMessenger,
      conversationId: currentChat?._id,
      sender: currentUser?._id,
    };
    try {
      const res = await axios.post(`/messages`, newMessenger);
      setMessages([...messages, res?.data]);
      reset({ textMessenger: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxWrapper-info">
                  <div className="chatBoxWrapper-info--user">
                    <div className="chatBoxWrapper-info--images">
                      <img
                        src={
                          userCurrentMess?.profilePicture
                            ? PF + userCurrentMess.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                        alt=""
                      />
                    </div>
                    <span className="chatBoxWrapper-info--username">
                      {userCurrentMess?.username}
                    </span>
                  </div>
                  <div className="chatBoxWrapper-info--func">
                    <span>
                      <FiPhoneCall />
                    </span>
                    <span>
                      <FiVideo />
                    </span>
                    <span>
                      <BiInfoCircle />
                    </span>
                  </div>
                </div>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div>
                      <Message message={m} own={m.sender === currentUser._id} />
                    </div>
                  ))}
                </div>
                <form
                  className="chatBoxBottom"
                  onSubmit={handleSubmit(handleSendMessenger)}
                >
                  <Input
                    control={control}
                    name="textMessenger"
                    className="chatBoxBottom-input"
                    placeholder={"Nhập hội thoại..."}
                  />
                </form>
              </>
            ) : (
              <span className="noConversationText">
                Mở Đoạn hội thoại để bắt đầu trò chuyện
              </span>
            )}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}