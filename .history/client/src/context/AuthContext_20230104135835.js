import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import useLocalStorage from "../hooks/useLocalStrorage";
import AuthReducer from "./AuthReducer";

let storedValueUser;

const INITIAL_STATE = {
  user: storedValueUser,
  isFecthing: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  // hook localstrogate
  const { storedValue: storedValueUser, setValue: setValueUser } =
    useLocalStorage("user", {});

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [showPostUpdate, setShowPostUpdate] = useState(false);

  const [followed, setFollowed] = useState(
    state?.user?.followings?.includes(state?.user?._id)
  );
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleFileImage = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClickShowShare = () => {
    setShowShare(!showShare);
  };

  // save local
  useEffect(() => {
    setValueUser(state?.user);
  }, [setValueUser, state?.user]);

  // get conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + state?.user?._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [state?.user?._id]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFecthing: state.isFecthing,
        error: state.error,
        dispatch,
        file,
        setFile,
        handleFileImage,
        showShare,
        setShowShare,
        handleClickShowShare,
        posts,
        setPosts,
        showPostUpdate,
        setShowPostUpdate,
        followed,
        setFollowed,
        conversations,
        setConversations,
        setOnlineUsers,
        onlineUsers,
        messages,
        setMessages,
        storedValueUser,
        setValueUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
