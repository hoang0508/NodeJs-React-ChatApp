import { useState } from "react";

export default function useValueToggle() {
  const [valueToggle, setValueToggle] = useState(false);
  const handleValueToggle = () => {
    setValueToggle(!valueToggle);
  };
  return {
    setValueToggle,
    valueToggle,
    handleValueToggle,
  };
}
