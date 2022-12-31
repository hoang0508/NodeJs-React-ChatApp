import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFecthing: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [showPostUpdate, setShowPostUpdate] = useState(false);
  const [commentData, setcommentData] = useState([]);
  const [followed, setFollowed] = useState(
    state?.user?.followings?.includes(state?.user?._id)
  );
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const handleFileImage = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClickShowShare = () => {
    setShowShare(!showShare);
  };

  // save local
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

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
        setcommentData,
        commentData,
        followed,
        setFollowed,
        conversations,
        setConversations,
        setOnlineUsers,
        onlineUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
