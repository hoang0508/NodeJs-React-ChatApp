import { createContext, useReducer, useRef } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFecthing: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [showShare, setShowShare] = useState(false);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
