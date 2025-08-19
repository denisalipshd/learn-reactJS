import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const TableCart = (props) => {
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((p) => p.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  return (
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
  );
};

export default TableCart;
