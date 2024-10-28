/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ClothingProduct from "./ClothingProduct";
import DefaultProduct from "./DefaultProduct";
import FoodsAndBeveragesProduct from "./FoodsAndBeveragesProduct";

const ShowProductCard = ({ product, getSellerProducts }) => {
  //   console.log(product);
  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md group">
      {product.product_type == "Default" && (
        <DefaultProduct
          product={product}
          getSellerProducts={getSellerProducts}
        />
      )}
      {product.product_type == "Foods & Beverages" && (
        <FoodsAndBeveragesProduct
          product={product}
          getSellerProducts={getSellerProducts}
        />
      )}
      {product.product_type == "Clothings" && (
        <ClothingProduct
          product={product}
          getSellerProducts={getSellerProducts}
        />
      )}
    </div>
  );
};

export default ShowProductCard;
