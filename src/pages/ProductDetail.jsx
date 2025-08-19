import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../services/products.services";
import useLogin from "../hooks/useLogin";

const ProductDetailPage = () => {
  useLogin();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductDetail(id, (data) => setProduct(data));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-5">
      <div className="bg-white shadow-lg rounded-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
        {product && (
          <>
            {/* Gambar Produk */}
            <div className="md:w-1/2 flex justify-center items-center bg-gray-50">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-80 object-contain p-5"
              />
            </div>

            {/* Detail Produk */}
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {product.title}
                </h1>
                <p className="text-xl text-blue-600 font-semibold mt-3">
                  ${product.price}
                </p>
                <p className="text-gray-600 mt-5 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tombol Aksi */}
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition duration-200">
                  Add to Cart
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-xl font-medium hover:bg-blue-50 transition duration-200">
                  Buy Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
