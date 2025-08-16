const Label = (props) => {
  const { htmlFor, children } = props;
  return (
    <label htmlFor={htmlFor} className="block mb-2 font-medium">
      {children}
    </label>
  );
};

export default Label;
