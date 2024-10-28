/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminAxiosInstance from "../../AdminAxiosInstance";

function DefaultProduct({ product, getSellerProducts }) {
  // console.log(product);

  // Function to handel product rejection
  const handelRejectSellerProduct = async () => {
    try {
      const url = "/admin/authorize-seller/reject-product";
      const response = await AdminAxiosInstance.post(url, {
        productId: product._id,
      });

      if (response.status === 200) {
        getSellerProducts();
        toast.success("Product rejected successfully");
      }
    } catch (error) {
      toast.error("Error while rejecting product");
    }
  };

  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md group h-full">
      {/* Image */}
      <div className="relative flex items-center justify-center h-[11.25rem] overflow-hidden group-hover:scale-105 transition-transform">
        <img
          className="w-full h-full object-cover rounded-t-sm"
          src={
            product?.images ||
            "https://rukminim2.flixcart.com/image/416/416/xif0q/shopsy-rice-light/b/n/a/star-nc-n5610-glowtronix-original-imag84fwe9wvzezu.jpeg"
          }
          alt={product?.product_name || "Product Image"}
        />
      </div>

      <div className="mt-4 px-3 pb-3 flex flex-col flex-1 gap-1 ">
        <h5 className="text-md tracking-tight text-slate-900 line-clamp-2 font-semibold truncate">
          {product.product_name}
        </h5>
      </div>

      <div className="mx-1 flex justify-center mb-2">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handelRejectSellerProduct}
        >
          Reject product
        </button>
      </div>
    </div>
  );
}

export default DefaultProduct;
