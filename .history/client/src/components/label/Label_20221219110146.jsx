import React from "react";
import "./Label.scss";
const Label = ({ children, name = "", className = "", ...props }) => {
  return (
    <label htmlFor={name} className={className} {...props}>
      {children}
    </label>
  );
};

export default Label;
