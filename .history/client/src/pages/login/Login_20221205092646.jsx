import { useContext, useRef } from "react";
import { loginCall } from "../../apiCall";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFecthing, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">HH social media</h3>
          <span className="loginDesc">
            Kết nối với bạn bè và thế giới xung quanh bạn trên mạng xã hội.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              // minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton">Đăng nhập</button>
            <span className="loginForgot">Quên mật khẩu?</span>
            <button className="loginRegisterButton">Tạo tài khoản mới!!</button>
          </form>
        </div>
      </div>
    </div>
  );
}
