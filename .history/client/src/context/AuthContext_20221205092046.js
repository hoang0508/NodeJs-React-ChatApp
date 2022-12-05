import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFecthing: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: StaticRange.user,
        isFecthing: StaticRange.isFecthing,
        error: StaticRange.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
