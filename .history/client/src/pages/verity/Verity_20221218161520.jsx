import React from "react";
import OtpInput from "react-otp-input";

const Verity = () => {
  return (
    <div>
      <OtpInput
        // onChange={this.handleChange}
        numInputs={6}
        separator={<span>-</span>}
      />
    </div>
  );
};

export default Verity;
