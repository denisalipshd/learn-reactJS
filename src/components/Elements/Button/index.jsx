const Button = (props) => {
  const { classname = "bg-black", children = "...", onClick = () => {}, type = "button" } = props;
  return (
    <button
      type={type}
      className={`h-10 px-6 rounded-md ${classname} text-white hover:cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
