import { useEffect, useState, useRef } from "react";
import Button from "../components/Elements/Button";
import CardProduct from "../components/Fragments/CardProduct";
import { getProducts } from "../services/products.services";
import useLogin from "../hooks/useLogin";

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const username = useLogin();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    getProducts((data) => setProducts(data));
  }, [products]);

  useEffect(
    () => {
      if (products.length > 0 && cart.length > 0) {
        const sum = cart.reduce((acc, item) => {
          const product = products.find((p) => p.id === item.id);
          return acc + product.price * item.qty;
        }, 0);
        setTotalPrice(sum);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    },
    [cart],
    [products]
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  return (
    <>
      <div className="flex justify-end items-center h-15 bg-blue-600 text-white px-10">
        {username}
        <Button classname="ml-5 bg-black" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="flex justify-center py-5 px-10">
        {/* rendering list products */}
        <div className="w-4/3 flex flex-wrap gap-6">
          {products.length > 0 &&
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header image={product.image} />
                <CardProduct.Body name={product.title.substring(0, 20) + "..."}>
                  {product.description.substring(0, 100)}...
                </CardProduct.Body>
                <CardProduct.Footer
                  price={product.price}
                  id={product.id}
                  handleAddToCart={handleAddToCart}
                />
              </CardProduct>
            ))}
        </div>
        <div className="w-2/3">
          <h1 className="text-2xl text-blue-600 font-bold mb-3">Cart</h1>
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-center">Product</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-center">Qty</th>
                <th className="px-4 py-2 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                cart.map((item) => {
                  const product = products.find((p) => p.id === item.id);
                  return (
                    <tr key={product.id}>
                      <td className="px-4 py-2">
                        {product.title.substring(0, 20)}...
                      </td>
                      <td className="px-4 py-2 text-right">
                        {product.price.toLocaleString("us-en", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td className="px-4 py-2 text-center">{item.qty}</td>
                      <td className="px-4 py-2 text-right">
                        {(item.qty * product.price).toLocaleString("us-en", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot className="bg-gray-100 font-bold">
              <tr ref={totalPriceRef}>
                <td colSpan="3" className="px-4 py-2 text-right">
                  Grand Total
                </td>
                <td className="px-4 py-2 text-right">
                  {totalPrice.toLocaleString("us-en", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
