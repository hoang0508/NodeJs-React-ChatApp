import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Message from "../../components/message/Message";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  const { handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      textMessenger: "",
    },
  });

  // get conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + currentUser._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser._id]);

  // get messenger
  useEffect(() => {
    const fetchMessenger = async () => {
      const res = await axios.get(`/messages/${currentChat?._id}`);
      setMessages(res?.data);
    };
    fetchMessenger();
  }, [currentChat?._id]);

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
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
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
                  <Input control={control} name="textMessenger" />
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