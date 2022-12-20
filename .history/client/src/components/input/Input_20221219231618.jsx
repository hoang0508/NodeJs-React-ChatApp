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
  className = "",
  ...props
}) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <div className="input">
      <div className="input-group">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          {...field}
          {...props}
          className={`input-search ${className} `}
        />
        {children && <span className="input-icon">{children}</span>}
      </div>
      {textError && <span className="input-error">{textError}</span>}
    </div>
  );
};

export default Input;
