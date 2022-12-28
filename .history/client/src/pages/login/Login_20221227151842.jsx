import { useContext } from "react";
import { loginCall } from "../../apiCall";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useValueToggle from "../../hooks/useValueToggle";
import IconEye from "../../components/icon/IconEye";
import { useNavigate } from "react-router";

// Validation Yup
const schema = yup
  .object({
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

export default function Login() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitLogin = async (value) => {
    try {
      await loginCall(
        { email: value.email, password: value.password },
        dispatch
      );
      navigate("/");
      toast.success("Đăng nhập thành công!!");
    } catch (error) {
      toast.error("Thất bại errorr !!");
    }
  };

  const { handleValueToggle, valueToggle } = useValueToggle();
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
          <form className="loginBox" onSubmit={handleSubmit(handleSubmitLogin)}>
            <h3 className="heading">Đăng nhập</h3>
            <Input
              type={"email"}
              placeholder="Nhập email..."
              name="email"
              control={control}
              textError={errors?.email?.message}
            ></Input>
            <Input
              type={valueToggle ? "text" : "password"}
              placeholder="Nhập mật khẩu..."
              name="password"
              control={control}
              textError={errors?.password?.message}
            >
              <IconEye onCick={() => handleValueToggle()} open={valueToggle} />
            </Input>
            <Button className="loginButton" type="submit">
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
