import "react-tagsinput/react-tagsinput.css";
import ProductType from "../../components/ProductType/ProductType";

const AddProduct = () => {
  return (
    <div>
      <h2 className=" text-2xl shadow-sm font-bold text-center border-b mb-2 pb-4">
        Add Product
      </h2>
      <ProductType />
    </div>
  );
};

export default AddProduct;
