import React from "react";

const Button = ({
  children,
  onClick = () => {},
  isLoading,
  className = "",
  ...props
}) => {
  return <button className={`button ${className}`}>{children}</button>;
};

export default Button;
