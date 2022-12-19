import React from "react";

const Button = ({
  children,
  type,
  onClick = () => {},
  isLoading,
  className = "",
  ...props
}) => {
  return (
    <button className={`button-btn ${className}`} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
