import React from "react";

const Button = ({ children, onClick = () => {}, isLoading, ...props }) => {
  return <button className="button">{children}</button>;
};

export default Button;
