import React from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { useParams } from "react-router";
import Input from "../../components/input/Input";
import { auth } from "../../firebases/firebase-config";
import { RecaptchaVerifier } from "firebase/auth";

const Verity = () => {
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const { sdt } = useParams();

  const handleSubmitVerity = (value) => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "capcha-verity",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  return (
    <div className="verity">
      <form onSubmit={handleSubmit(handleSubmitVerity)}>
        <p>Bạn cần xác thức số điện thoại</p>
        <Input type="tel" control={control} name="sdt" value={sdt} />
        <button type="submit">Lấy mã xác thực</button>
      </form>
      <OtpInput
        // onChange={this.handleChange}
        numInputs={6}
        separator={<span>-</span>}
      />
      <div id="capcha-verity"></div>
    </div>
  );
};

export default Verity;
