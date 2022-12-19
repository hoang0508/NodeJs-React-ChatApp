import "./register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import IconEye from "../../components/icon/IconEye";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import Button from "../../components/button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Yup
const schema = yup
  .object({
    username: yup
      .string()
      .required("Tên bạn không được để trống!!")
      .max(20, "Bạn được phép nhập 20 kí tự")
      .min(2, "Tên bạn quá ngắn!!"),
    email: yup
      .string()
      .required("Bạn cần nhập email vào ô trống!!")
      .email("Bạn cần nhập đúng địa chỉ email!"),
    password: yup
      .string()
      .required("Mật khẩu không được để trống!!")
      .max(30, "Mật khẩu không vượt quá 30 kí tự!")
      .min(8, "Mật khẩu cần 8 kí tự")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Mật khẩu chứa 8 kí tự, chứa chữ in hoa chữ in thường và số , kí tự đặc biệt"
      ),
  })
  .required();

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      sdt: "",
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
        sdt: value.sdt,
      };
      try {
        await axios.post("auth/register", userNew);
        toast.warning("Bạn cần xác thực tài khoản!!");
        navigate(`/auth-verity/${value.sdt}`);
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
            <Button className="loginButton" type="submit">
              Đăng ký
            </Button>
            <p className="account-text">
              Bạn đã có tài khoản?<Link to="/login">Đăng nhập ngay</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
