import axios from "axios";
import { LoginSuccess } from "./context/AuthActions";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch(LoginSuccess(res.data));
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
