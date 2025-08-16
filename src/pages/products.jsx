import { useState } from "react";
import Button from "../components/Elements/Button";
import CardProduct from "../components/Fragments/CardProduct";

const products = [
  {
    id: 1,
    name: "Nike Shoes",
    image: "/images/shoes-1.jpg",
    price: 100,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            officia excepturi reprehenderit, quidem dolorum aliquam dicta quae
            dolores nobis nostrum fugiat blanditiis aspernatur? Natus sunt
            possimus doloribus placeat, eos dignissimos.`,
  },
  {
    id: 2,
    name: "Adidas Shoes",
    image: "/images/shoes-1.jpg",
    price: 200,
    description: `lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            officia excepturi reprehenderit, quidem dolorum aliquam dicta quae
            dolores nobis nostrum fugiat blanditiis aspernatur? Natus sunt`,
  },
  {
    id: 3,
    name: "Jordan Shoes",
    image: "/images/shoes-1.jpg",
    price: 1000000,
    description: `lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            officia excepturi reprehenderit, quidem dolorum aliquam dicta quae
            dolores nobis nostrum fugiat blanditiis aspernatur? Natus sunt`,
  },
];

const email = localStorage.getItem("email");

const ProductsPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      qty: 1,
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
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

  return (
    <>
      <div className="flex justify-end items-center h-15 bg-blue-600 text-white px-10">
        {email}
        <Button classname="ml-5 bg-black" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="flex justify-center py-5 px-10">
        {/* rendering list products */}
        <div className="w-4/3 flex flex-wrap gap-6">
          {products.map((product) => (
            <CardProduct key={product.id}>
              <CardProduct.Header image={product.image} />
              <CardProduct.Body name={product.name}>
                {product.description}
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
              {cart.map((item, index) => {
                const product = products.find((p) => p.id === item.id);
                return (
                  <tr
                    key={product.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2 text-right">
                      {product.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="px-4 py-2 text-center">{item.qty}</td>
                    <td className="px-4 py-2 text-right">
                      {(item.qty * product.price).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-100 font-bold">
              <tr>
                <td colSpan="3" className="px-4 py-2 text-right">
                  Grand Total
                </td>
                <td className="px-4 py-2 text-right">
                  {cart
                    .reduce((acc, item) => {
                      const product = products.find((p) => p.id === item.id);
                      return acc + product.price * item.qty;
                    }, 0)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
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
