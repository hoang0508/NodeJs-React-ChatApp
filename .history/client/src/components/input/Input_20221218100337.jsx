import React from "react";
import "./Input.scss";
const Input = ({ type, placeholder, children, name, ...props }) => {
  return (
    <div className="input">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        {...props}
        className="input-search"
      />
      {children && <span>{children}</span>}
    </div>
  );
};

export default Input;
