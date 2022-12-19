import "./register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import IconEye from "../../components/icon/IconEye";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Register() {
  const {
    handleSubmit,
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
      console.log(userNew);
      // try {
      //   await axios.post("auth/register", userNew);
      //   toast.success("Đăng ký thành công");
      //   navigate("/login");
      // } catch (error) {
      //   toast.error("Đăng ký thất bại!!");
      // }
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
          <form
            className="loginBox"
            onSubmit={handleSubmit(handleSubmitRegister)}
          >
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
            >
              <IconEye />
            </Input>
            <Input
              type={"password"}
              placeholder="Nhập lại mật khẩu..."
              name="passwordAgain"
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
