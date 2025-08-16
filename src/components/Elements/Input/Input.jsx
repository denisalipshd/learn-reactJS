const Input = (props) => {
  const { type, placeholder, name } = props;
  return (
    <input
      type={type}
      name={name}
      id={name}
      className="w-full px-3 py-2 border border-gray-300 rounded placeholder: opacity-50"
      placeholder={placeholder}
      autoComplete="off"
    />
  );
};

export default Input;
