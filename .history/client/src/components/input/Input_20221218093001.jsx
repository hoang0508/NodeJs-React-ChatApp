import React from "react";

const Input = ({ type, placeholder, child, name, ...props }) => {
  return (
    <div className="input">
      <input type={type} placeholder={placeholder} name={name} {...props} />
    </div>
  );
};

export default Input;