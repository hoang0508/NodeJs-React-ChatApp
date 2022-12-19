import React from "react";

const Label = ({ children, name = "", className = "", ...props }) => {
  return (
    <label htmlFor={name} className={className} {...props}>
      {children}
    </label>
  );
};

export default Label;
