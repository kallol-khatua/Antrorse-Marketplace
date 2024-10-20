/* eslint-disable react/prop-types */

import ClothingProduct from "./ClothingProduct";

function ProductCardByCategory({ product }) {
  //   console.log(product);
  return (
    <>
      {product.product_type === "Clothings" && (
        <ClothingProduct product={product} />
      )}
      {product.product_type === "Food" && <div></div>}
    </>
  );
}

export default ProductCardByCategory;
