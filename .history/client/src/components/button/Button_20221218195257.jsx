import React from "react";

const Button = ({
  children,
  onClick = () => {},
  isLoading,
  className = "",
  ...props
}) => {
  return <button className={`button-btn ${className}`}>{children}</button>;
};

export default Button;
