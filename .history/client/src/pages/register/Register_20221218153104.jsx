import "./register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import IconEye from "../../components/icon/IconEye";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordAgain: "",
    },
  });

  const navigate = useNavigate();
  const handleSubmitRegister = async (value) => {
    if (value.password !== value.passwordAgain) {
      toast.error("Mật khẩu không khớp nhau!!");
    } else {
      const userNew = {
        username: value.username,
        email: value.email,
        password: value.password,
      };
      try {
        await axios.post("auth/register", userNew);
        toast.success("Đăng ký thành công");
        navigate("/login");
      } catch (error) {
        toast.error("Đăng ký thất bại!!");
      }
    }
  };

  const [valueToggle, setValueToggle] = useState(false);
  const [valueToggle1, setValueToggle1] = useState(false);
  const handleValueToggle = () => {
    setValueToggle(!valueToggle);
  };

  const handleValueToggle1 = () => {
    setValueToggle1(!valueToggle1);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">HH Social</h3>
          <span className="loginDesc">
            HH giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của
            bạn.
          </span>
        </div>
        <div className="loginRight">
          <form
            className="loginBox"
            onSubmit={handleSubmit(handleSubmitRegister)}
          >
            <h3 className="heading">Đăng ký tài khoản</h3>
            <Input
              type={"text"}
              placeholder="Nhập tên của bạn..."
              name="username"
              control={control}
            ></Input>
            <Input
              type={"email"}
              placeholder="Nhập email..."
              name="email"
              control={control}
            ></Input>
            <Input
              type={"number"}
              placeholder="Nhập số điện thoại..."
              name="sdt"
              control={control}
            ></Input>
            <Input
              type={valueToggle ? "text" : "password"}
              placeholder="Nhập mật khẩu..."
              name="password"
              control={control}
            >
              <IconEye onCick={() => handleValueToggle()} open={valueToggle} />
            </Input>
            <Input
              type={valueToggle1 ? "text" : "password"}
              placeholder="Nhập lại mật khẩu..."
              name="passwordAgain"
              control={control}
            >
              <IconEye
                onCick={() => handleValueToggle1()}
                open={valueToggle1}
              />
            </Input>
            <button className="loginButton" type="submit">
              Đăng ký
            </button>
            <p className="account-text">
              Bạn đã có tài khoản?<Link to="/login">Đăng nhập ngay</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
