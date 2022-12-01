import {createContext, useReducer} from "react"

const INITIAL_STATE = {
  user: null,
  isFecthing: false,
  error: false,
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
  const [] = useReducer(AuthContext, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{user: StaticRange.user, isFecthing: StaticRange.isFecthing, error: StaticRange.error}}>
        {children}
    </AuthContext.Provider>
  )
}