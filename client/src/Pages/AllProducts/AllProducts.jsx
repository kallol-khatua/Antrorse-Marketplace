import "react-tagsinput/react-tagsinput.css";
import AllProductType from "../../components/AllProductType/AllProductType";

const AllProduct = () => {
  return (
    <div>
      <h2 className=" text-2xl shadow-sm font-bold text-center border-b mb-2 pb-4">
        All Products
      </h2>
      <AllProductType />
    </div>
  );
};

export default AllProduct;
