import { useRef } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import IconEye from "../../components/icon/IconEye";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password dont'match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">HH Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmitRegister}>
            <h3 className="heading">Đăng ký tài khoản</h3>
            <Input
              type={"text"}
              placeholder="Nhập tên của bạn..."
              name="username"
            ></Input>
            <Input
              type={"email"}
              placeholder="Nhập email..."
              name="email"
            ></Input>
            <Input
              type={"password"}
              placeholder="Nhập mật khẩu..."
              name="password"
            ></Input>
            <Input
              type={"password"}
              placeholder="Nhập lại mật khẩu..."
              name="password"
            >
              <IconEye />
            </Input>
            <button className="loginButton" type="submit">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
