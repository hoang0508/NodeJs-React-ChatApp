import React from "react";
import OtpInput from "react-otp-input";

const Verity = () => {
  return (
    <div>
      <div>
        <p>Bạn cần xác thức số điện thoại</p>
        <input type="number" />
      </div>
      <OtpInput
        // onChange={this.handleChange}
        numInputs={6}
        separator={<span>-</span>}
      />
    </div>
  );
};

export default Verity;
