import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { useParams } from "react-router";
import Input from "../../components/input/Input";
import { auth } from "../../firebases/firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Verity = () => {
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      sdt: "",
    },
  });

  const { sdt } = useParams();

  const generateCapcha = () => {
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

  const valueRef = useRef();
  const handleSubmitVerity = (value) => {
    const phoneNumber = valueRef.current?.value;
    generateCapcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  };

  return (
    <div className="verity">
      <form onSubmit={handleSubmit(handleSubmitVerity)}>
        <p>Bạn cần xác thức số điện thoại</p>
        <input
          type="tel"
          // control={control}
          name="sdt"
          ref={valueRef}
          value={`+84${sdt.slice(1)}`}
        />
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
