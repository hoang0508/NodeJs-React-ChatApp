import "./messenger.scss";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Message from "../../components/message/Message";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { BiInfoCircle } from "react-icons/bi";
import { FiPhoneCall, FiVideo } from "react-icons/fi";
import { BsEmojiLaughing, BsFillTrashFill } from "react-icons/bs";
import { IoIosImages } from "react-icons/io";
import { io } from "socket.io-client";

export default function Messenger() {
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const {
    user: currentUser,
    conversations,
    handleFileImage,
    file,
    setFile,
    messages,
    setMessages,
  } = useContext(AuthContext);
  const [userCurrentMess, setUserCurrentMess] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const scrollRef = useRef();

  // hook  form
  const { handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      textMessenger: "",
    },
  });

  // socket io realtime user, get messenger
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket?.current?.emit("addUser", currentUser?._id);
    socket.current.on("getMessage", (data) => {
      alert("oke");
      console.log(
        "🚀 ~ file: Messenger.jsx:49 ~ socket.current.on ~ data",
        data
      );
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [currentUser?._id]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat, setMessages]);

  // get messenger
  useEffect(() => {
    const fetchMessenger = async () => {
      const res = await axios.get(`/messages/${currentChat?._id}`);
      setMessages(res?.data);
    };
    fetchMessenger();
  }, [currentChat?._id, setMessages]);

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
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newMessenger.image = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    // socket realtime messenger
    const receiverId = currentChat?.members?.find(
      (item) => item !== currentUser?._id
    );

    socket?.current.emit("sendMessage", {
      senderId: currentUser?._id,
      receiverId,
      text: values.textMessenger,
      newMessenger,
    });

    try {
      const res = await axios.post(`/messages`, newMessenger);
      setMessages([...messages, res?.data]);
      reset({ textMessenger: "" });
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

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
              <div className="chatBoxWrapper-messenger">
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
                    <div ref={scrollRef}>
                      <Message
                        userCurrentMess={userCurrentMess}
                        message={m}
                        own={m.sender === currentUser._id}
                      />
                    </div>
                  ))}
                </div>
                <form
                  className="chatBoxBottom"
                  onSubmit={handleSubmit(handleSendMessenger)}
                >
                  <div className="chatBoxFile">
                    {file && (
                      <>
                        <img src={URL.createObjectURL(file)} alt="#" />
                        <div
                          className="chatBoxFile-remove"
                          onClick={() => setFile(null)}
                        >
                          <BsFillTrashFill />
                        </div>
                      </>
                    )}
                  </div>
                  <Input
                    control={control}
                    name="textMessenger"
                    className="chatBoxBottom-input"
                    placeholder={"Nhập hội thoại..."}
                  >
                    <span>
                      <BsEmojiLaughing />
                    </span>
                    <div>
                      <label htmlFor="file" className="">
                        <span className="option-icon">
                          <IoIosImages />
                        </span>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          name=""
                          id="file"
                          accept=".png,.jpeg,.jpg"
                          onChange={(e) => handleFileImage(e)}
                        />
                      </label>
                    </div>
                  </Input>
                </form>
              </div>
            ) : (
              <span className="noConversationText">
                <div className="noConversationText-hello">
                  <h3 className="noConversationText-hello--title">
                    Xin chào, {currentUser?.username?.split(" ").shift()}
                  </h3>
                  <div className="noConversationText-hello--image">
                    <img
                      src={
                        currentUser?.profilePicture
                          ? PF + currentUser?.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <span className="noConversationTex-mess">
                  Mở Đoạn hội thoại để bắt đầu trò chuyện
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
