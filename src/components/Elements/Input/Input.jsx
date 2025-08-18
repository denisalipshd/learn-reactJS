import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { type, placeholder, name } = props;
  return (
    <input
      type={type}
      name={name}
      id={name}
      className="w-full px-3 py-2 border border-gray-300 rounded placeholder: opacity-50"
      placeholder={placeholder}
      autoComplete="off"
      ref={ref}
    />
  );
});

export default Input;
