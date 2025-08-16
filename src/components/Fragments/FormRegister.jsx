import Button from "../Elements/Button";
import InputForm from "../Elements/Input";

const FormRegister = () => {
  return (
    <form action="">
      <InputForm
        label="Full Name"
        name="full_name"
        type="text"
        placeholder="Enter your full name"
      />
      <InputForm
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
      />
      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="*****"
      />
      <InputForm
        label="Confirm Password"
        name="confirm_password"
        type="password"
        placeholder="*****"
      />
      <Button classname="bg-blue-600 w-full">Register</Button>
    </form>
  );
};

export default FormRegister;
