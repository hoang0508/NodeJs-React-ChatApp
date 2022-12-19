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
  const [inputDesc, setInputDesc] = useState();
  const [file, setFile] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [showPostUpdate, setShowPostUpdate] = useState(false);

  const handleInputDesc = (e) => {
    setInputDesc(e.target.value);
  };

  const handleClickShowShare = () => {
    setShowShare(!showShare);
  };

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
        inputDesc,
        setInputDesc,
        handleInputDesc,
        file,
        setFile,
        showShare,
        setShowShare,
        handleClickShowShare,
        posts,
        setPosts,
        showPostUpdate,
        setShowPostUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
