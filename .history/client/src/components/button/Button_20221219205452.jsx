import React from "react";
import "./Button.scss";

const Button = ({
  children,
  type,
  onClick = () => {},
  isLoading,
  className = "",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`button-btn ${className}`}
      type={type}
      {...props}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

export default Button;
