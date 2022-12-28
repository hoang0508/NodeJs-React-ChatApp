import axios from "axios";
import { toast } from "react-toastify";
import { LoginSuccess } from "./context/AuthActions";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch(LoginSuccess(res.data));
  } catch (error) {
    toast.error("Bạn cần kiểm tra lại email, password!!");
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
