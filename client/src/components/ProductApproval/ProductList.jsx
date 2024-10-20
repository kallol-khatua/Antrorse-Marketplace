/* eslint-disable react/prop-types */
import ClothingProduct from "./ClothingProduct";
import FoodsAndBeverages from "./FoodsAndBeverages";

function ProductList({ product }) {
  //   console.log(product);
  return (
    <>
      {product.product_type === "Clothings" && (
        <ClothingProduct product={product} />
      )}

      {product.product_type === "Foods & Beverages" && (
        <FoodsAndBeverages product={product} />
      )}
    </>
  );
}

export default ProductList;
