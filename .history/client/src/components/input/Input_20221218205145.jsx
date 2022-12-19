import React from "react";
import { useController } from "react-hook-form";
import "./Input.scss";
const Input = ({
  type,
  placeholder,
  children,
  name,
  control,
  textError = "",
  ...props
}) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <div className="input">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        {...field}
        {...props}
        className="input-search"
      />
      {textError && <span className="input-error">{textError}</span>}
      {children && <span className="input-icon">{children}</span>}
    </div>
  );
};

export default Input;
