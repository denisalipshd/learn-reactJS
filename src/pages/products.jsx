import { useEffect, useState } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import { getProducts } from "../services/products.services";
import useLogin from "../hooks/useLogin";
import TableCart from "../components/Fragments/TableCart";

const ProductsPage = () => {
  useLogin();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts((data) => setProducts(data));
  }, [products]);

  return (
    <>
      <div className="flex justify-center py-5 px-10">
        {/* rendering list products */}
        <div className="w-4/3 flex flex-wrap gap-6">
          {products.length > 0 &&
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header image={product.image} id={product.id} />
                <CardProduct.Body name={product.title.substring(0, 20) + "..."}>
                  {product.description.substring(0, 100)}...
                </CardProduct.Body>
                <CardProduct.Footer price={product.price} id={product.id} />
              </CardProduct>
            ))}
        </div>
        <div className="w-2/3">
          <h1 className="text-2xl text-blue-600 font-bold mb-3">Cart</h1>
          <TableCart products={products} />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
