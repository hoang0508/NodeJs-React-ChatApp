import React from "react";

const Input = ({ type, placeholder, children, name, ...props }) => {
  return (
    <div className="input">
      <input type={type} placeholder={placeholder} name={name} {...props} />
      {children}
    </div>
  );
};

export default Input;
