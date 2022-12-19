import React from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { useParams } from "react-router";
import Input from "../../components/input/Input";

const Verity = () => {
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const param = useParams();
  console.log("🚀 ~ file: Verity.jsx:13 ~ Verity ~ param", param);

  const handleSubmitVerity = (value) => {};

  return (
    <div className="verity">
      <form onSubmit={handleSubmit(handleSubmitVerity)}>
        <p>Bạn cần xác thức số điện thoại</p>
        <Input type="tel" control={control} name="sdt" />
        <button type="submit">Lấy mã xác thực</button>
      </form>
      <OtpInput
        // onChange={this.handleChange}
        numInputs={6}
        separator={<span>-</span>}
      />
    </div>
  );
};

export default Verity;
