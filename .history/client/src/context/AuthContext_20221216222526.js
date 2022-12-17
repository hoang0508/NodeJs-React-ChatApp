import { createContext, useEffect, useReducer, useRef, useState } from "react";
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
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [showShare, setShowShare] = useState(false);

  const handleClickShowShare = () => {
    setShowShare(!showShare);
  };

  // lấy bài post data
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      setPosts(
        res?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        )
      );
    };
    fetchPost();
  }, [username, user._id]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFecthing: state.isFecthing,
        error: state.error,
        dispatch,
        desc,
        file,
        setFile,
        showShare,
        setShowShare,
        handleClickShowShare,
        posts,
        setPosts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
