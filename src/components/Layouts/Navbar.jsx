import { useSelector } from "react-redux";
import useLogin from "../../hooks/useLogin";
import Button from "../Elements/Button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const username = useLogin();
  const cart = useSelector((state) => state.cart.data);
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    setTotalCart(cart.reduce((acc, item) => acc + item.qty, 0));
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-end items-center h-15 bg-blue-600 text-white px-10">
      {username}
      <Button classname="ml-5 bg-black" onClick={handleLogout}>
        Logout
      </Button>
      <div className="bg-black text-white p-2 px-4 rounded-lg ml-5">
        {totalCart}
      </div>
    </div>
  );
};

export default Navbar;
